import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { useRoute } from "vitepress";
import { nextTick, onMounted, watch } from "vue";
import "./style.css";

let mermaidInitialized = false;

async function renderMermaid() {
  if (typeof window === "undefined") return;

  const mermaid = (await import("mermaid")).default;

  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "neutral"
    });
    mermaidInitialized = true;
  }

  await nextTick();
  await mermaid.run({
    querySelector: ".mermaid"
  });
}

const theme: Theme = {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();

    onMounted(() => {
      void renderMermaid();
    });

    watch(
      () => route.path,
      () => {
        window.setTimeout(() => void renderMermaid(), 100);
      }
    );
  }
};

export default theme;
