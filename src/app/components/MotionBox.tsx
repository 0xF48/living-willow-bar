/** 
 * Motion Box
 * Smoothly animates elements between different positions and sizes,
 * supporting transitions between relative and fixed positioning.
 */

"use client";

import { motion, useMotionValue, useSpring, type SpringOptions } from 'framer-motion';
import React, { useEffect, useRef, useState, useLayoutEffect, useCallback, useMemo, memo } from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';

const SPRING_CONFIG: SpringOptions = { stiffness: 600, damping: 35 };
const RELATIVE_TRANSITION_DELAY = 400;
const MEASURE_RETRY_DELAY = 10;

interface MotionBoxProps {
	portalRef?: React.MutableRefObject<HTMLElement | null>;
	useAbsoluteOffset?: boolean;
	relativeContentPosition?: boolean;
	resetKey?: string;
	placeholderClassName?: string;
	classNames?: {
		positionStyle?: React.CSSProperties;
		style: string;
		position: string;
	};
	children: React.ReactNode;
}

interface Dimensions {
	width: number;
	height: number;
}

interface Position {
	x: number;
	y: number;
	width: number;
	height: number;
}

// Memoized child wrapper to prevent re-renders
const ContentWrapper = memo(({
	className,
	children
}: {
	className: string;
	children: React.ReactNode;
}) => (
	<div className={cn(className, 'w-full h-full relative')}>
		{children}
	</div>
));
ContentWrapper.displayName = 'ContentWrapper';

function MotionBox({
	relativeContentPosition = false,
	portalRef,
	useAbsoluteOffset = false,
	resetKey,
	placeholderClassName = '',
	classNames = { positionStyle: {}, style: '', position: '' },
	children,
}: MotionBoxProps) {
	// Refs
	const relativeRef = useRef<HTMLDivElement>(null);
	const fixedRef = useRef<HTMLDivElement>(null);
	const retryTimerRef = useRef<NodeJS.Timeout>(null);
	const rafRef = useRef<number>(null);
	const lastPositionRef = useRef<Position | null>(null);

	// State
	const [mounted, setMounted] = useState(false);
	const [initialized, setInitialized] = useState(false);
	const [isRelative, setIsRelative] = useState(true);
	const [placeholderDimensions, setPlaceholderDimensions] = useState<Dimensions>({
		width: 0,
		height: 0
	});

	// Motion values
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue(0);
	const height = useMotionValue(0);

	// Springs
	const spx = useSpring(x, SPRING_CONFIG);
	const spy = useSpring(y, SPRING_CONFIG);
	const spwidth = useSpring(width, SPRING_CONFIG);
	const spheight = useSpring(height, SPRING_CONFIG);

	// Memoized values
	const classNameIsRelative = useMemo(() =>
		classNames.position.includes('relative'),
		[classNames.position]
	);

	const portalTarget = useMemo(() =>
		mounted ? (portalRef?.current || document.body) : null,
		[mounted, portalRef]
	);

	// Initialize mount state
	useEffect(() => {
		setMounted(true);
		setIsRelative(classNameIsRelative);
	}, []);

	// Get position from rect
	const getRectPosition = useCallback((rect: DOMRect): Position => ({
		x: useAbsoluteOffset ? rect.left : rect.x,
		y: useAbsoluteOffset ? rect.top : rect.y,
		width: rect.width,
		height: rect.height,
	}), [useAbsoluteOffset]);

	// Update motion values with diff checking
	const updateMotionValues = useCallback((pos: Position, jump = false) => {
		// Skip if position hasn't changed significantly (only when not jumping)
		if (!jump && lastPositionRef.current) {
			const last = lastPositionRef.current;
			const threshold = 0.01;

			if (
				Math.abs(last.x - pos.x) < threshold &&
				Math.abs(last.y - pos.y) < threshold &&
				Math.abs(last.width - pos.width) < threshold &&
				Math.abs(last.height - pos.height) < threshold
			) {
				return;
			}
		}

		lastPositionRef.current = pos;

		if (jump) {
			spx.jump(pos.x);
			spy.jump(pos.y);
			spwidth.jump(pos.width);
			spheight.jump(pos.height);
		} else {
			x.set(pos.x);
			y.set(pos.y);
			width.set(pos.width);
			height.set(pos.height);
		}
	}, [x, y, width, height, spx, spy, spwidth, spheight]);

	// Measure and update position
	const measureAndUpdate = useCallback(() => {
		// IMPORTANT: Always measure the correct element based on target classes
		const targetElement = classNameIsRelative ? relativeRef.current : fixedRef.current;
		const rect = targetElement?.getBoundingClientRect();

		if (!rect) {
			// Retry if element isn't ready
			if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
			retryTimerRef.current = setTimeout(measureAndUpdate, MEASURE_RETRY_DELAY);
			return;
		}

		const position = getRectPosition(rect);
		updateMotionValues(position, !initialized);

		if (!initialized) {
			setInitialized(true);
		}

		// Update placeholder dimensions when in relative mode
		if (classNameIsRelative) {
			setPlaceholderDimensions({
				width: rect.width,
				height: rect.height
			});
		}
	}, [classNameIsRelative, getRectPosition, updateMotionValues, initialized]);

	// Update position when classes change
	useLayoutEffect(() => {
		if (!mounted) return;

		// Use setTimeout to ensure DOM has updated with new classes
		const timer = setTimeout(measureAndUpdate, MEASURE_RETRY_DELAY);

		return () => {
			clearTimeout(timer);
			if (retryTimerRef.current) {
				clearTimeout(retryTimerRef.current);
			}
		};
	}, [classNames.position, classNames.positionStyle, resetKey, mounted, measureAndUpdate]);

	// Handle transition timing
	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (classNameIsRelative !== isRelative) {
			if (classNameIsRelative) {
				// Delay transition to relative for smooth animation
				timer = setTimeout(() => setIsRelative(true), RELATIVE_TRANSITION_DELAY);
			} else {
				// Immediate transition to fixed
				setIsRelative(false);
			}
		}

		return () => clearTimeout(timer);
	}, [classNameIsRelative, isRelative]);

	// Handle scroll and resize with throttling
	useEffect(() => {
		if (!mounted) return;

		let ticking = false;

		const handleUpdate = () => {
			if (!ticking) {
				rafRef.current = requestAnimationFrame(() => {
					const targetElement = classNameIsRelative ? relativeRef.current : fixedRef.current;
					const rect = targetElement?.getBoundingClientRect();

					if (rect) {
						updateMotionValues(getRectPosition(rect));
					}

					ticking = false;
				});
				ticking = true;
			}
		};

		// Use passive event listeners for better performance
		const options = { passive: true, capture: true };

		// Only listen to scroll for relative positioning
		if (classNameIsRelative) {
			window.addEventListener('scroll', handleUpdate, options);
		}
		window.addEventListener('resize', handleUpdate, options as AddEventListenerOptions);

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			window.removeEventListener('scroll', handleUpdate, true);
			window.removeEventListener('resize', handleUpdate);
		};
	}, [classNameIsRelative, mounted, getRectPosition, updateMotionValues]);

	// Motion styles
	const motionStyle = useMemo(() => ({
		x: spx,
		y: spy,
		width: spwidth,
		height: spheight,
	}), [spx, spy, spwidth, spheight]);

	// Inner content component
	const innerContent = useMemo(() =>
		relativeContentPosition ? (
			<div className="w-full h-full relative">
				{children}
			</div>
		) : (
			<motion.div
				style={{ width: spwidth, height: spheight }}
				className="absolute left-0 top-0"
			>
				{children}
			</motion.div>
		),
		[relativeContentPosition, spwidth, spheight, children]
	);

	return (
		<>
			{/* Always render the relative measurement div */}
			<div
				ref={relativeRef}
				className={classNameIsRelative ? classNames.position : (placeholderClassName || 'relative')}
				style={classNameIsRelative ? classNames.positionStyle : {
					width: placeholderDimensions.width || 'auto',
					height: placeholderDimensions.height || 'auto',
				}}
			>
				{isRelative && (
					<ContentWrapper className={classNames.style}>
						{children}
					</ContentWrapper>
				)}
			</div>

			{/* Fixed measurement div (hidden) - CRITICAL: This needs the actual position classes */}
			{mounted && portalTarget && !classNameIsRelative && createPortal(
				<div
					ref={fixedRef}
					className={classNames.position}
					style={{
						...classNames.positionStyle,
						visibility: 'hidden',
						pointerEvents: 'none',
						zIndex: -9999,
					}}
					aria-hidden="true"
				>
					<ContentWrapper className={classNames.style}>
						{children}
					</ContentWrapper>
				</div>,
				portalTarget
			)}

			{/* Animated element */}
			{!isRelative && mounted && portalTarget && createPortal(
				<motion.div
					className={cn(
						useAbsoluteOffset ? 'absolute' : 'fixed',
						'left-0 top-0 overflow-hidden pointer-events-auto',
						classNames.style
					)}
					style={motionStyle}
				>
					{innerContent}
				</motion.div>,
				portalTarget
			)}
		</>
	);
}

export default memo(MotionBox);