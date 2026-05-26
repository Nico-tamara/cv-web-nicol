
    const STORAGE_KEY = "cv_nicol_tamara_actualizado";

    const defaultProfile = {
      name: "Nicol Tamara Nieves Quiñonez",
      role: "Modernización | Soporte | Docente de Matemáticas | Docker",
      email: "nievesquinoneztamara@gmail.com",
      location: "Huánuco, Perú",
      photo: "img/foto.jpeg",
      summary: "Estudiante de Ingeniería de Sistemas, practicante en el Área de Modernización y Soporte del Gobierno Regional Huánuco. Cuenta con experiencia en documentación técnica, soporte tecnológico, mejora de procesos administrativos, desarrollo web, Docker y enseñanza de matemáticas en la Academia Stephen Hawking."
    };

    const projects = [
      {
        tag: "Gobierno Regional Huánuco",
        title: "Área de Modernización",
        text: "Apoyo en documentación técnica, análisis de procesos, organización de información y actividades vinculadas a transformación digital.",
        items: ["Modernización", "Gestión pública", "Procesos administrativos", "Documentación"]
      },
      {
        tag: "Soporte",
        title: "Área de Soporte",
        text: "Apoyo en atención de incidencias, revisión de equipos, orientación a usuarios y acompañamiento en herramientas digitales.",
        items: ["Soporte técnico", "Usuarios", "Incidencias", "Herramientas digitales"]
      },
      {
        tag: "Educación",
        title: "Maestra de Matemáticas",
        text: "Enseñanza de matemáticas en la Academia Stephen Hawking, con explicación de ejercicios y refuerzo académico.",
        items: ["Matemáticas", "Academia Stephen Hawking", "Enseñanza", "Refuerzo"]
      },
      {
        tag: "Docker",
        title: "CV web desplegable con Docker",
        text: "Proyecto preparado para ejecutarse en un contenedor Nginx usando Dockerfile y Docker Compose.",
        items: ["Dockerfile", "Nginx", "docker compose", "Puerto 8081"]
      },
      {
        tag: "Web",
        title: "Diseño responsive",
        text: "Interfaz adaptable para computadora, tablet y celular, con botones de navegación interna y secciones ordenadas.",
        items: ["HTML", "CSS", "JavaScript", "Responsive"]
      },
      {
        tag: "Auth Service",
        title: "Documentación de autenticación",
        text: "Participación académica en documentación de servicio de logueo único, modelos, endpoints, stores y manual de usuario.",
        items: ["Laravel", "Vue", "API REST", "Manual"]
      },
      {
        tag: "SGD",
        title: "Sistema de Gestión Documental",
        text: "Análisis de módulos, flujos de derivación, vistos buenos, expedientes y procesos documentarios institucionales.",
        items: ["Documentos", "Derivaciones", "Vistos buenos", "Expedientes"]
      },
      {
        tag: "Firma electrónica",
        title: "Tutorial de validación",
        text: "Guion y estructura de video para explicar firma electrónica, firma visible y validación de documentos firmados.",
        items: ["Firma digital", "Validación", "Capacitación", "Buenas prácticas"]
      },
      {
        tag: "Simulación",
        title: "Proyectos académicos de simulación",
        text: "Modelos de atención, tiempos de espera, tráfico y procesos usando herramientas de simulación.",
        items: ["Arena", "AnyLogic", "FlexSim", "Vensim"]
      }
    ];

    let profile = loadProfile();

    function $(id) {
      return document.getElementById(id);
    }

    function loadProfile() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return saved ? { ...defaultProfile, ...saved } : defaultProfile;
      } catch (error) {
        return defaultProfile;
      }
    }

    function saveProfile() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }

    function applyProfile() {
      $("nameText").textContent = profile.name;
      $("nameCard").textContent = profile.name;
      $("roleText").textContent = profile.role;
      $("emailText").textContent = profile.email;
      $("locationText").textContent = profile.location;
      $("summaryText").textContent = profile.summary;
      $("photoText").src = profile.photo;

      $("inputName").value = profile.name;
      $("inputRole").value = profile.role;
      $("inputEmail").value = profile.email;
      $("inputLocation").value = profile.location;
      $("inputPhoto").value = profile.photo;
      $("inputSummary").value = profile.summary;
    }

    function renderProjects(filter = "") {
      const query = filter.trim().toLowerCase();

      const filtered = projects.filter((project) => {
        const content = `${project.tag} ${project.title} ${project.text} ${project.items.join(" ")}`.toLowerCase();
        return content.includes(query);
      });

      $("projectGrid").innerHTML = filtered.map((project) => `
        <article class="card project-card">
          <span class="tag">${project.tag}</span>
          <h3>${project.title}</h3>
          <p>${project.text}</p>
          <ul>
            ${project.items.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      `).join("");
    }

    function showToast(message) {
      $("toast").textContent = message;
      $("toast").classList.add("show");
      setTimeout(() => $("toast").classList.remove("show"), 2200);
    }

    function updateProgress() {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
      $("progress").style.width = `${progress}%`;
    }

    $("themeBtn").addEventListener("click", () => {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      document.body.setAttribute("data-theme", isDark ? "light" : "dark");
      $("themeBtn").textContent = isDark ? "🌙 Tema" : "☀️ Tema";
    });

    $("editBtn").addEventListener("click", () => {
      $("editModal").classList.add("open");
    });

    $("closeModal").addEventListener("click", () => {
      $("editModal").classList.remove("open");
    });

    $("editModal").addEventListener("click", (event) => {
      if (event.target === $("editModal")) {
        $("editModal").classList.remove("open");
      }
    });

    $("editForm").addEventListener("submit", (event) => {
      event.preventDefault();

      profile = {
        name: $("inputName").value,
        role: $("inputRole").value,
        email: $("inputEmail").value,
        location: $("inputLocation").value,
        photo: $("inputPhoto").value,
        summary: $("inputSummary").value
      };

      saveProfile();
      applyProfile();
      $("editModal").classList.remove("open");
      showToast("Información actualizada");
    });

    $("searchInput").addEventListener("input", (event) => {
      renderProjects(event.target.value);
    });

    $("resetSearch").addEventListener("click", () => {
      $("searchInput").value = "";
      renderProjects();
      showToast("Mostrando todos los proyectos");
    });

    window.addEventListener("scroll", updateProgress);

    applyProfile();
    renderProjects();
    updateProgress();
