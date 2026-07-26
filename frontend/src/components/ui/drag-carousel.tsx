// //drag-carousel.tsx
// 'use client';

// import { motion } from 'motion/react';
// import Image from 'next/image';
// import React, { useEffect, useRef, useState } from 'react';

// export type DragCarouselItem = {
//   id: number | string;
//   url: string;
//   title: string;
// };

// const DEFAULT_ITEMS: DragCarouselItem[] = [
//   {
//     id: 1,
//     url: 'https://images.unsplash.com/photo-1761882835101-02ab45ac0726?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=690',
//     title: 'MAXX PHAM',
//   },
//   {
//     id: 2,
//     url: 'https://images.unsplash.com/photo-1661980494567-40a5e01b699b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=685',
//     title: 'BOXIEN BAY',
//   },
//   {
//     id: 3,
//     url: 'https://images.unsplash.com/photo-1761882725885-d3d8bd2032d1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
//     title: 'AUSIZE MAM',
//   },
// ];

// export function DragCarousel({
//   items = DEFAULT_ITEMS,
// }: {
//   items?: DragCarouselItem[];
// }) {
//   const [width, setWidth] = useState(0);
//   const carousel = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (carousel.current) {
//       setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
//     }
//   }, [items]);

//   return (
//     <div className="w-full overflow-hidden">
//       <motion.div
//         ref={carousel}
//         drag="x"
//         whileDrag={{ scale: 0.95 }}
//         dragElastic={0.2}
//         dragConstraints={{ right: 0, left: -width }}
//         dragTransition={{ bounceDamping: 30 }}
//         transition={{ duration: 0.2, ease: 'easeInOut' }}
//         className="flex gap-2 will-change-transform cursor-grab active:cursor-grabbing"
//       >
//         {items.map((item) => (
//           <motion.div
//             key={item.id}
//             className="relative min-w-[20rem] min-h-100 p-2"
//           >
//             <div className="relative h-full w-full overflow-hidden rounded-3xl">
//               <Image
//                 src={item.url}
//                 width={400}
//                 height={400}
//                 alt={item.title}
//                 className="h-full w-full object-cover pointer-events-none"
//               />
//               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//                 <p className="text-xs font-semibold uppercase tracking-wide text-white">
//                   {item.title}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export default DragCarousel;