import { createRouter, createWebHistory } from "vue-router";



function guard(to, from, next) {
  if (localStorage.activeUser) {
    next();
  } else next({ name: "Login" });
}

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/login/index.vue"),
  },

  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: () => import("@/Layout/index.vue"),
    beforeEnter: guard,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "constancias",
        name: "constancias",
        component: () => import("@/views/medico/genConstancia"),
        meta: {
          groupParent: "Project",
          hide: true,
          appheight: true,
        },
      },
      {
        path: "ver-constancias",
        name: "verconstancias",
        component: () => import("@/views/medico/verConstancias"),
        meta: {
          groupParent: "Project",
          hide: true,
          appheight: true,
        },
      },
      {
        path: "/pre-inscripciones",
        name: "preinscripcioness",
        component: () => import("@/views/postulante/pre-inscripcion.vue"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "/examen-vocacional",
        name: "ex-vocacional",
        component: () => import("@/views/postulante/pre-inscripcion.vue"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "/perfil",
        name: "perfil",
        component: () => import("@/views/profile.vue"),
      },
      {
        path: "/examen-vocacional",
        name: "exvocacional",
        component: () => import("@/views/app/vocacional/index.vue"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      
    ],
  },

  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/error.vue"),
  },





];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// routes.beforeEach(async (to, from) => {
//   if (
//     !localStorage.activeUser &&
//     to.name !== 'Login'
//   ) {
//     return { name: 'Login' }
//   }
// })
router.beforeEach((to, from, next) => {
  const titleText = to.name;
  const words = titleText.split(" ");
  const wordslength = words.length;
  if(localStorage.activeUser && titleText === 'Login'){
      router.go(-1)
  }

  for (let i = 0; i < wordslength; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  document.title = "Admision Unap  - " + words;
  next();
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
