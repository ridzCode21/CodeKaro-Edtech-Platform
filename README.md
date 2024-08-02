# React & Tailwind CSS Starter Pack

This is a starter pack for creating React projects with Tailwind CSS configured. It uses React version **18.2** and Tailwind CSS version **3.2**.

## Usage

This starter pack includes a basic setup for using **Tailwind CSS with React**. To start building your own components and styles, follow these steps:

1. Clone the repository to your local machine.
    ```sh
    git clone https://github.com/thepranaygupta/react-tailwind-css-starter-pack.git
    ```

1. Install the required packages.
    ```sh
    cd react-tailwind-css-starter-pack
    npm install
    ```

1. Start the development server.
    ```sh
    npm start
    ```
1. Open the project in your browser at [`http://localhost:3000`](http://localhost:3000) to view your project.
1. Create your React components and add your styles using Tailwind classes. You can also create new CSS files and import them into your components.

The project is set up to use `postcss-cli` to process your CSS files. You can add your own `tailwind.config.js` file to customize your Tailwind setup.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request.

w-[55.125rem] h-[55.125rem] rounded-full border border-[#19191A] absolute left-1/2 -translate-x-1/2 -bottom-[43.875rem] opacity-40 -z-10

w-[46.875rem] h-[46.875rem] rounded-full border border-[#19191A] absolute left-1/2 -translate-x-1/2 -bottom-[39.75rem] opacity-40 -z-10

w-[39.375rem] h-[39.375rem] rounded-full border border-[#19191A] absolute -bottom-[36rem] opacity-40 -z-10 left-1/2 -translate-x-1/2

background: linear-gradient(rgba(102, 116, 204, 0.18) 0%, rgba(0, 0, 0, 0.18) 34.18%), rgb(13, 13, 13); width: 60.5046rem; height: 60.5067rem;

background: linear-gradient(rgba(102, 116, 204, 0.18) 8.36%, rgba(0, 0, 0, 0.18) 16.6%), rgb(13, 13, 13); width: 46.9169rem; height: 46.9169rem;

background: linear-gradient(rgba(102, 116, 204, 0.18) 0.82%, rgba(0, 0, 0, 0.18) 32.96%), rgb(13, 13, 13); width: 42.5512rem; height: 42.5512rem;


function animate() {
        let timer = isBypassingTimer ? 100 : 2000;
        setTimeout(() => {
          if (activeSlideIndex >= itemsLength) {
            activeSlideIndex = 1;
          } else if (!isBypassingTimer) {
            activeSlideIndex++;
          }

          if (position === endPosition) {
            isReadyToReset = true;
            isBypassingTimer = true;
          }

          if (position !== endPosition) {
            isBypassingTimer = false;
          }

          // normal animation
          if (!isReadyToReset) {
            position = position - measurement * numVisible;
            itemGroup.style.transitionDuration = TRANSITION_DURATION_INITIAL;
          }

          // reset container position & bypass timer
          if (isReadyToReset) {
            isReadyToReset = false;
            position = 0;
            itemGroup.style.transitionDuration = TRANSITION_DURATION_RESET;
          }
          itemGroup.style.transform = itemGroupTransform[direction](position);
          updateLiveRegion();
          requestAnimationFrame(animate);
        }, timer);
      }


import React, { useEffect, useRef, useState } from 'react';
import './ContinuousCarousel.css'; // Import your CSS styles here

const TRANSITION_DURATION_INITIAL = '0.5s';
const TRANSITION_DURATION_RESET = '0s';
const DIRECTION_VERTICAL = 'vertical';

const ContinuousCarousel = ({ element, numVisible = 1, direction = DIRECTION_VERTICAL }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
  const [position, setPosition] = useState(0);
  const containerRef = useRef(null);
  const itemGroupRef = useRef(null);
  const [itemsLength, setItemsLength] = useState(0);
  const [items, setItems] = useState([]);
  const [itemGroupTransform, setItemGroupTransform] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    const itemNodes = Array.from(container.querySelectorAll('.carousel-item'));
    const itemGroupNode = container.querySelector('.carousel-group');

    setItems(itemNodes);
    setItemsLength(itemNodes.length);
    setItemGroupTransform({
      [DIRECTION_VERTICAL]: (position) => `translate3d(0, ${position}px, 0)`
    });

    insertLiveRegion(container);
    cloneNodes(itemNodes, itemGroupNode, numVisible);
    animateContainer(itemNodes[0].offsetHeight, direction, itemGroupNode);

    // Clean up the interval on component unmount
    return () => {
      itemGroupNode.style.transitionDuration = TRANSITION_DURATION_RESET;
      itemGroupNode.style.transform = 'translate3d(0, 0, 0)';
    };
  }, [numVisible, direction]);

  const insertLiveRegion = (container) => {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.setAttribute('class', 'live-region hidden');
    container.appendChild(liveRegion);
  };

  const updateLiveRegion = (container) => {
    const liveRegion = container.querySelector('.live-region');
    liveRegion.textContent = `Item ${activeSlideIndex} of ${itemsLength}`;
  };

  const cloneNodes = (items, itemGroup, numVisible) => {
    const fragment = document.createDocumentFragment();
    items.slice(0, numVisible).forEach((item) => {
      const node = item.cloneNode(true);
      fragment.appendChild(node);
    });
    itemGroup.appendChild(fragment);
  };

  const animateContainer = (measurement, direction, itemGroup) => {
    let endPosition = -(measurement * itemsLength);
    let isBypassingTimer = false;
    let isReadyToReset = false;

    const animate = () => {
      let timer = isBypassingTimer ? 100 : 2000;
      setTimeout(() => {
        setActiveSlideIndex((prevIndex) => {
          if (prevIndex >= itemsLength) {
            return 1;
          }
          return prevIndex + 1;
        });

        setPosition((prevPosition) => {
          if (prevPosition === endPosition) {
            isReadyToReset = true;
            isBypassingTimer = true;
            return 0;
          }

          if (prevPosition !== endPosition) {
            isBypassingTimer = false;
          }

          if (!isReadyToReset) {
            itemGroup.style.transitionDuration = TRANSITION_DURATION_INITIAL;
            return prevPosition - measurement * numVisible;
          }

          itemGroup.style.transitionDuration = TRANSITION_DURATION_RESET;
          setPosition(0);
          isReadyToReset = false;
          return prevPosition;
        });

        if (typeof itemGroupTransform[direction] === 'function') {
          itemGroup.style.transform = itemGroupTransform[direction](position);
        }

        updateLiveRegion(containerRef.current);
        requestAnimationFrame(animate);
      }, timer);
    };

    requestAnimationFrame(animate);
    updateLiveRegion(containerRef.current);
  };

  return (
    <div id={element} ref={containerRef} className="carousel-container">
      <div ref={itemGroupRef} className="carousel-group">
        {items.map((item, index) => (
          <div className="carousel-item" key={index}>
            {item.textContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinuousCarousel;


linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb))