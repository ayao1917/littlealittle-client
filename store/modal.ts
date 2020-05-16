import { MutationTree } from "vuex";

export const state = () => ({
  activeModal: "",
});

export type ModalState = ReturnType<typeof state>;

export const mutations: MutationTree<ModalState> = {
  closeModal: (state) => (state.activeModal = ""),
  openModal: (state, name: string) => (state.activeModal = name),
};
