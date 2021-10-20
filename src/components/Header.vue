<template>
  <o-sidebar
    :fullheight="true"
    :fullwidth="false"
    :overlay="true"
    :right="true"
    v-model:open="sidebarOpen"
    contentClass="sidebar"
  >
    <o-button
      style="
        width: 2rem;
        position: absolute;
        right: 1rem;
        top: 1rem;
        padding-right: 0.5rem;
        background-color: #1f2937;
      "
      icon-left="times"
      label="X"
      @click="sidebarOpen = false"
    />

    <img
      style="
        max-width: 4 rem;
        display: flex;
        justify-self: center;
        align-self: center;
      "
      src="/img/res/poap-yup-logo-optimized.png"
      alt="YUP poap logo"
    />

    <h3 class="menu-title">YUP</h3>

    <ul>
      <li v-for="(menu, index) in menuDropDownLinks.links" :key="index">
        <a class="menu-pill" :href="menu.href">
          {{ menu.text }}
        </a>
      </li>
    </ul>
  </o-sidebar>
  <div class="hero">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <header class="flex justify-between items-center py-4 md:py-8">
        <!-- logo - start -->
        <a
          href="/"
          class="
            inline-flex
            items-center
            text-black-800 text-2xl
            md:text-3xl
            font-bold
            gap-2.5
          "
          aria-label="logo"
        >
          <img
            style="height: 5rem; margin-left: 5rem"
            src="/img/res/poap-yup-logo-optimized.png"
            alt="YUP poap logo"
          />
        </a>
        <!-- logo - end -->

        <!-- nav - start -->
        <nav class="hidden lg:flex gap-12">
          <a
            href="/"
            class="
              text-gray-800
              dark:text-gray-200
              hover:text-yellow-500
              active:text-yellow-700
              text-lg
              font-semibold
              transition
              duration-100
            "
            >Home</a
          >

          <o-dropdown v-model="menuDropDownLinks" aria-role="list">
            <template #trigger>
              <o-button style="background-color: transparent">
                <span
                  style="color: aliceblue; text-shadow: 0px 1px 4px #222"
                  class="inline-flex items-center text-lg font-semibold gap-1"
                  >{{ menuDropDownLinks.text }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-yellow-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style="display: inline"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </o-button>
            </template>

            <a
              class="menu-link"
              v-for="(menu, index) in menuDropDownLinks.links"
              :key="index"
              :href="menu.href"
            >
              <o-dropdown-item
                :value="menu"
                aria-role="listitem"
                class="
                  gap-1
                  p-1
                  hover:text-gray-700 hover:dark:text-gray-200
                  dark:text-gray-300
                "
              >
                <div class="media">
                  <div class="media-content">
                    {{ menu.text }}
                  </div>
                </div>
              </o-dropdown-item>
            </a>
          </o-dropdown>
          <a
            href="/past-events"
            class="
              text-gray-800
              dark:text-gray-200
              hover:text-yellow-500
              active:text-yellow-700
              text-lg
              font-semibold
              transition
              duration-100
            "
            >Past Events</a
          >
          <a
            href="/admin"
            class="
              text-gray-800
              dark:text-gray-200
              hover:text-yellow-500
              active:text-yellow-700
              text-lg
              font-semibold
              transition
              duration-100
            "
            >Admin</a
          >
        </nav>
        <!-- nav - end -->

        <!-- buttons - start -->
        <div
          class="
            flex flex-col
            sm:flex-row sm:justify-center
            lg:justify-start
            gap-2.5
            -ml-8
          "
        >
          <button
            id="theme-switch"
            style="opacity: 0.65"
            class="
              ml-5
              w-16
              h-6
              rounded-full
              bg-white
              flex
              items-center
              transition
              duration-300
              focus:outline-none
              shadow
              dark:bg-gray-700
            "
          >
            <div
              id="svg-theme-switch"
              @click="themeSwitch"
              :class="`
                border border-white
                w-9
                h-9
                relative
                rounded-full
                transition
                duration-500
                transform
                ${
                  themeDark
                    ? `bg-gray-700
                translate-x-full`
                    : `bg-yellow-400
                -translate-x-2`
                } 
                p-1
                text-white`"
              v-html="themeSwitchIcon"
            ></div>
          </button>
        </div>

        <button
          type="button"
          class="
            inline-flex
            items-center
            lg:hidden
            bg-gray-200
            hover:bg-gray-300
            focus-visible:ring
            ring-indigo-300
            text-gray-500
            active:text-gray-700
            text-sm
            md:text-base
            font-semibold
            rounded-lg
            gap-2
            px-2.5
            py-2
          "
          style="background: #ffffffde"
          @click="toggleSidebar()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>

          Menu
        </button>
        <!-- buttons - end -->
      </header>
      <!-- menu - end -->
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { getThemeMode } from "@/util/index.js";

export default defineComponent({
  name: "Header",
  components: {},
  setup(props) {
    const route = useRoute();
    const isHome = computed(() => route.path.match(/(\/$|\/page\/\d+)/g));

    const isDarkTheme = () => getThemeMode() === "dark";

    const themeDark = ref(isDarkTheme());
    const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>`;

    const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`;
    const themeSwitchIcon = ref(isDarkTheme() ? darkIcon : lightIcon);

    let routes = inject("routes");
    let sidebarOpen = ref(false);
    const isSwitchingTheme = ref(false);

    const linksFs = routes.filter((route) => route.type === "yup");
    let menuDropDownLinks = ref({
      links: linksFs,
      text: "YUP",
    });

    const themeSwitch = async () => {
      if (!isSwitchingTheme.value) {
        const isDarkmode = document.documentElement.classList.contains("dark");
        isSwitchingTheme.value = true;
        if (isDarkmode) {
          themeDark.value = false;
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          themeSwitchIcon.value = lightIcon;
          localStorage.setItem("theme", "light");
        } else {
          themeDark.value = true;
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
          themeSwitchIcon.value = darkIcon;
          localStorage.setItem("theme", "dark");
        }
        isSwitchingTheme.value = false;
      }
    };

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    onMounted(() => {});

    return {
      menuDropDownLinks,
      sidebarOpen,
      toggleSidebar,
      props,
      themeDark,
      themeSwitchIcon,
      themeSwitch,
      isHome,
    };
  },
});
</script>

<style lang="scss">
.media {
  align-items: flex-start;
  display: flex;
  text-align: left;
}
.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  overflow-y: hidden;
  overflow-x: auto;
}
.media-left {
  margin-right: 1rem;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}
nav .o-drop__menu {
  background: var(--glass-menu-bg);
}

.o-drop__menu--active {
  box-shadow: 0.03rem 0.1rem 0.2rem;
  margin-top: 0.5rem;
  padding: 0.2rem 1.6rem 0.1rem 0.4rem;
  background: var(--glassBg);
  box-shadow: 0 8px 32px 0 var(--glassShadow);
  color: var(--glassText);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  min-width: 8.5rem;
}
.hero {
  background: url(/img/res/header-waves.svg),
    linear-gradient(
      180deg,
      var(--headerColor1) 0%,
      var(--headerColor2) 1.98%,
      var(--headerColor3) 100%
    );
  background-repeat: no-repeat;
  background-size: cover, auto;
}

.sidebar {
  background: url(/img/res/header-waves.svg),
    linear-gradient(180deg, #212529 0%, #36354a 61.98%, #3b3c68 100%);
  background-position: 50% 200px, top;
  background-repeat: no-repeat;
  background-size: cover, auto;
  min-width: 18rem;
  padding-top: 2rem;
  color: white;
  padding-left: 1.5rem;
}

.menu-link {
  & > div > div {
    position: relative;
  }

  & > div > div::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--headerColor1);
    transform-origin: bottom right;
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }

  & > div > div:hover::before {
    transform-origin: bottom left;
    transform: scaleX(1);
  }
}

.menu-pill {
  background-color: rgba(221, 221, 221, 0.068);
  border: none;
  color: #cfaf1e;
  padding: 0.2em 5.2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0.3rem 0.2rem;
  cursor: pointer;
  border-radius: 10rem;
  &:hover {
    border: 1px solid rgb(207, 175, 30);
  }
}
.menu-title {
  text-align: center;
  margin-right: 4em;
  /* margin: 2rem; */
  margin-top: 2em;
  margin-bottom: -0.3em;
  text-transform: uppercase;
  color: #b9b9b9;
  border: 1;
  border-bottom: 1;
  transform: skewX(156deg);
}
</style>
