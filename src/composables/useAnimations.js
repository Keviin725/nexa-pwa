import { ref, onMounted, onUnmounted } from "vue";

export function useAnimations() {
  const isVisible = ref(false);
  const elementRef = ref(null);

  const observer = ref(null);

  const startAnimation = () => {
    isVisible.value = true;
  };

  const stopAnimation = () => {
    isVisible.value = false;
  };

  const setupIntersectionObserver = () => {
    if (!elementRef.value) return;

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.value.observe(elementRef.value);
  };

  const cleanup = () => {
    if (observer.value) {
      observer.value.disconnect();
    }
  };

  onMounted(() => {
    setupIntersectionObserver();
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    isVisible,
    elementRef,
    startAnimation,
    stopAnimation,
  };
}

export function useStaggeredAnimation(delay = 100) {
  const staggeredItems = ref([]);

  const addItem = (item) => {
    const index = staggeredItems.value.length;
    staggeredItems.value.push({
      ...item,
      delay: index * delay,
      visible: false,
    });
  };

  const showItem = (index) => {
    if (staggeredItems.value[index]) {
      staggeredItems.value[index].visible = true;
    }
  };

  const showAll = () => {
    staggeredItems.value.forEach((item, index) => {
      setTimeout(() => {
        item.visible = true;
      }, item.delay);
    });
  };

  const reset = () => {
    staggeredItems.value.forEach((item) => {
      item.visible = false;
    });
  };

  return {
    staggeredItems,
    addItem,
    showItem,
    showAll,
    reset,
  };
}

export function useHoverAnimation() {
  const isHovered = ref(false);

  const onMouseEnter = () => {
    isHovered.value = true;
  };

  const onMouseLeave = () => {
    isHovered.value = false;
  };

  return {
    isHovered,
    onMouseEnter,
    onMouseLeave,
  };
}
