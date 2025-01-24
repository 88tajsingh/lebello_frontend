import { ref, onUnmounted } from 'vue';
import { useScrollLock } from './useScrollLock';

export function useModal() {
  const isModalOpen = ref(false);
  const { lockScroll } = useScrollLock();
  let unlockScroll = null;

  const openModal = () => {
    isModalOpen.value = true;
    unlockScroll = lockScroll();
  };

  const closeModal = () => {
    isModalOpen.value = false;
    if (unlockScroll) {
      unlockScroll();
      unlockScroll = null;
    }
  };

  // Cleanup on component unmount
  onUnmounted(() => {
    if (unlockScroll) {
      unlockScroll();
    }
  });

  return {
    isModalOpen,
    openModal,
    closeModal
  };
}
