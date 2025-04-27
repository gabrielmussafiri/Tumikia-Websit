// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");

    // Animate menu toggle bars
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => bar.classList.toggle("active"));
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest("#nav") &&
      !event.target.closest("#menu-toggle")
    ) {
      nav.classList.remove("active");
    }
  });

  // Active menu link on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });

    // Show/hide back to top button
    const backToTop = document.getElementById("back-to-top");
    if (window.scrollY > 500) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }

    // Header shadow on scroll
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }
  });

  // Back to top button functionality
  const backToTop = document.getElementById("back-to-top");
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // View more services
  const viewMoreBtn = document.getElementById("view-more-services");
  const additionalServices = document.querySelector(".additional-services");

  viewMoreBtn.addEventListener("click", function () {
    additionalServices.style.display =
      additionalServices.style.display === "grid" ? "none" : "grid";
    viewMoreBtn.textContent =
      additionalServices.style.display === "grid"
        ? "Voir moins"
        : "Voir tous les services";
  });

  // Service Details Modal
  const modal = document.getElementById("service-modal");
  const modalContent = document.getElementById("modal-content-container");
  const closeModal = document.querySelector(".close-modal");
  const readMoreBtns = document.querySelectorAll(".read-more");

  // Service details content (would typically come from a database)
  const serviceDetails = {
    communication: {
      title: "Communication & Marketing",
      icon: "bullhorn",
      content: `
                <p>Notre équipe de marketing et communication est composée d'experts passionnés qui savent comment promouvoir efficacement votre entreprise dans le paysage digital d'aujourd'hui.</p>
                <h4>Nos services incluent:</h4>
                <ul>
                    <li><strong>Gestion de site web:</strong> Création, maintenance et optimisation de votre présence en ligne.</li>
                    <li><strong>Marketing de produit:</strong> Stratégies complètes pour positionner et promouvoir vos produits et services.</li>
                    <li><strong>Panneau Publicitaire:</strong> Conception et placement de publicités physiques stratégiques.</li>
                    <li><strong>Création de contenus:</strong> Rédaction, conception graphique et production audiovisuelle de qualité.</li>
                    <li><strong>Gestion de réseaux sociaux:</strong> Stratégies de médias sociaux pour accroître votre visibilité et engagement.</li>
                    <li><strong>Gestion de campagne publicitaire:</strong> Planification et exécution de campagnes publicitaires ciblées et efficaces.</li>
                </ul>
                <p>Que vous soyez une entreprise établie ou une start-up en croissance, nos solutions de marketing et communication sont conçues pour vous aider à atteindre vos objectifs commerciaux.</p>
            `,
    },
    evenementiel: {
      title: "Événementiel",
      icon: "calendar-alt",
      content: `
                <p>Notre équipe d'organisation d'événements excelle dans la création d'expériences mémorables, qu'il s'agisse de conférences professionnelles, de concerts ou de mariages.</p>
                <h4>Nos services incluent:</h4>
                <ul>
                    <li><strong>Conférences et émissions télévisées:</strong> Organisation logistique complète pour vos événements professionnels et médiatiques.</li>
                    <li><strong>Réalisation documentaire:</strong> Production de documentaires de haute qualité.</li>
                    <li><strong>Concerts populaires et acoustiques:</strong> Gestion complète de concerts et d'événements musicaux.</li>
                    <li><strong>Wedding Planner:</strong> Planification et coordination de mariages parfaits jusqu'au moindre détail.</li>
                    <li><strong>Photographie et vidéo:</strong> Services de capture professionnelle pour immortaliser vos événements.</li>
                </ul>
                <p>Notre expertise en gestion d'événements nous permet de prendre en charge tous les aspects de votre projet, de la planification initiale à l'exécution finale, garantissant un événement réussi et sans stress.</p>
            `,
    },
    geologie: {
      title: "Géologie",
      icon: "mountain",
      content: `
                <p>Notre département de géologie offre une expertise scientifique et technique de haut niveau pour divers secteurs industriels et environnementaux.</p>
                <h4>Nos services incluent:</h4>
                <ul>
                    <li><strong>Études minéralogiques:</strong> Analyse et caractérisation des ressources minérales.</li>
                    <li><strong>  Analyse et caractérisation des ressources minérales.</li>
                    <li><strong>Topographie:</strong> Création de cartes topographiques précises et mesures sur le terrain.</li>
                    <li><strong>Forage:</strong> Services de forage d'exploration et d'échantillonnage du sous-sol.</li>
                    <li><strong>Modélisation géologique:</strong> Création de modèles 3D du sous-sol pour la planification de projets.</li>
                    <li><strong>Évaluation des risques naturels:</strong> Identification et analyse des risques géologiques potentiels.</li>
                </ul>
                <p>Notre équipe de géologues expérimentés fournit des données fiables et des analyses expertes pour vous aider à prendre des décisions éclairées concernant vos projets d'exploration ou d'aménagement du territoire.</p>
            `,
    },
    informatique: {
      title: "Informatique",
      icon: "laptop-code",
      content: `
                <p>Notre département informatique offre des solutions technologiques complètes pour répondre à tous vos besoins numériques.</p>
                <h4>Nos services incluent:</h4>
                <ul>
                    <li><strong>Fournitures de matériel informatique:</strong> Vente d'ordinateurs, périphériques et accessoires de qualité.</li>
                    <li><strong>Réparation et maintenance:</strong> Services techniques pour maintenir votre équipement en parfait état de fonctionnement.</li>
                    <li><strong>Installation de logiciels:</strong> Configuration et mise en place de logiciels adaptés à vos besoins spécifiques.</li>
                    <li><strong>Support technique:</strong> Assistance technique réactive pour résoudre rapidement vos problèmes informatiques.</li>
                    <li><strong>Conception de logiciels:</strong> Développement d'applications sur mesure pour votre entreprise.</li>
                    <li><strong>Création de sites web:</strong> Conception et développement de sites internet professionnels et responsifs.</li>
                    <li><strong>Développement d'applications mobiles:</strong> Création d'applications innovantes pour smartphones et tablettes.</li>
                </ul>
                <p>Notre équipe d'experts en informatique vous accompagne dans votre transformation numérique, en vous fournissant des solutions adaptées à votre budget et à vos objectifs.</p>
            `,
    },
    transport: {
      title: "Transport",
      icon: "truck",
      content: `
                <p>Notre service de transport offre des solutions logistiques fiables et efficaces pour vos besoins de mobilité et de livraison.</p>
                <h4>Caractéristiques principales:</h4>
                <ul>
                    <li><strong>Flotte moderne:</strong> Véhicules de haute gamme régulièrement entretenus pour assurer fiabilité et confort.</li>
                    <li><strong>Chauffeurs professionnels:</strong> Conducteurs expérimentés et formés aux normes de sécurité les plus strictes.</li>
                    <li><strong>Services sur mesure:</strong> Transport adapté à vos besoins spécifiques, qu'il s'agisse de personnes ou de marchandises.</li>
                    <li><strong>Couverture géographique étendue:</strong> Services disponibles dans toute la région.</li>
                    <li><strong>Sécurité garantie:</strong> Protocoles de sécurité rigoureux pour protéger passagers et marchandises.</li>
                </ul>
                <p>Que vous ayez besoin de transport pour un événement spécial, des déplacements professionnels ou des livraisons régulières, notre service de transport s'engage à vous offrir un service ponctuel, sûr et professionnel.</p>
            `,
    },
    construction: {
      title: "Construction",
      icon: "hard-hat",
      content: `
                <p>Notre département de construction offre des services complets pour tous types de projets, de la conception initiale à la réalisation finale.</p>
                <h4>Notre expertise couvre:</h4>
                <ul>
                    <li><strong>Projets résidentiels:</strong> Construction de maisons individuelles et immeubles résidentiels.</li>
                    <li><strong>Projets commerciaux:</strong> Réalisation de bureaux, magasins et espaces commerciaux.</li>
                    <li><strong>Projets industriels:</strong> Construction d'usines, entrepôts et installations industrielles.</li>
                    <li><strong>Conception architecturale:</strong> Services de design et plans architecturaux personnalisés.</li>
                    <li><strong>Gestion de projets:</strong> Supervision complète du chantier, du début à la fin.</li>
                    <li><strong>Rénovation:</strong> Transformation et modernisation de bâtiments existants.</li>
                </ul>
                <p>Notre équipe de professionnels qualifiés s'engage à livrer des projets de haute qualité, dans les délais et le budget convenus, tout en respectant les normes de sécurité et les réglementations en vigueur.</p>
            `,
    },
    petroliere: {
      title: "Industrie Pétrolière",
      icon: "gas-pump",
      content: `
                <p>Notre division pétrolière est spécialisée dans la distribution et la gestion de produits pétroliers de haute qualité pour répondre aux besoins énergétiques de nos clients.</p>
                <h4>Nos services comprennent:</h4>
                <ul>
                    <li><strong>Distribution de carburants:</strong> Approvisionnement fiable en essence, diesel et autres carburants.</li>
                    <li><strong>Produits pétroliers spécialisés:</strong> Fourniture d'huiles industrielles, lubrifiants et autres dérivés.</li>
                    <li><strong>Solutions de stockage:</strong> Installation et maintenance de réservoirs et systèmes de stockage.</li>
                    <li><strong>Logistique pétrolière:</strong> Transport sécurisé de produits pétroliers.</li>
                    <li><strong>Consultation énergétique:</strong> Conseils pour optimiser votre consommation de carburant.</li>
                </ul>
                <p>Nous nous engageons à fournir des produits pétroliers de qualité supérieure, tout en respectant les normes environnementales et de sécurité les plus strictes, pour répondre efficacement aux besoins énergétiques de nos clients industriels et particuliers.</p>
            `,
    },
    maintenance: {
      title: "Maintenance",
      icon: "tools",
      content: `
                <p>Notre service de maintenance offre des solutions complètes pour l'entretien et la réparation de vos installations techniques.</p>
                <h4>Nos domaines d'expertise incluent:</h4>
                <ul>
                    <li><strong>Électricité:</strong> Installation, réparation et mise aux normes de systèmes électriques.</li>
                    <li><strong>Plomberie:</strong> Installation et réparation de systèmes de plomberie et sanitaires.</li>
                    <li><strong>Climatisation:</strong> Installation, entretien et réparation de systèmes de climatisation et ventilation.</li>
                    <li><strong>Maintenance préventive:</strong> Programmes d'entretien régulier pour prévenir les pannes.</li>
                    <li><strong>Maintenance corrective:</strong> Intervention rapide pour réparer les dysfonctionnements.</li>
                    <li><strong>Audit technique:</strong> Évaluation de l'état de vos installations et recommandations d'amélioration.</li>
                </ul>
                <p>Notre équipe de techniciens qualifiés est disponible pour assurer le bon fonctionnement de vos équipements et installations, prolonger leur durée de vie et optimiser leur performance.</p>
            `,
    },
    immobilier: {
      title: "Immobilier",
      icon: "home",
      content: `
                <p>Notre agence immobilière offre une gamme complète de services pour vous accompagner dans tous vos projets immobiliers.</p>
                <h4>Nos services comprennent:</h4>
                <ul>
                    <li><strong>Achat et vente:</strong> Accompagnement personnalisé pour l'acquisition ou la vente de biens immobiliers.</li>
                    <li><strong>Location:</strong> Gestion locative complète et mise en relation entre propriétaires et locataires.</li>
                    <li><strong>Évaluation immobilière:</strong> Estimation précise de la valeur marchande de votre bien.</li>
                    <li><strong>Conseil en investissement:</strong> Analyse et recommandations pour optimiser vos investissements immobiliers.</li>
                    <li><strong>Gestion de propriétés:</strong> Administration et maintenance de vos biens immobiliers.</li>
                    <li><strong>Développement immobilier:</strong> Accompagnement dans vos projets de construction ou de rénovation.</li>
                </ul>
                <p>Notre équipe de professionnels de l'immobilier s'engage à vous offrir un service transparent et personnalisé, adapté à vos besoins spécifiques et à votre budget.</p>
            `,
    },
    location: {
      title: "Location Véhicule",
      icon: "car",
      content: `
                <p>Notre service de location de véhicules met à votre disposition une flotte variée pour répondre à tous vos besoins de mobilité.</p>
                <h4>Notre offre comprend:</h4>
                <ul>
                    <li><strong>Véhicules diversifiés:</strong> Voitures compactes, berlines, SUV, utilitaires et véhicules de luxe.</li>
                    <li><strong>Flexibilité de durée:</strong> Locations à court terme (journée, week-end) ou à long terme (mensuel, annuel).</li>
                    <li><strong>Occasions spéciales:</strong> Véhicules pour mariages, événements d'entreprise et autres occasions.</li>
                    <li><strong>Entretien régulier:</strong> Tous nos véhicules sont rigoureusement entretenus pour garantir votre sécurité.</li>
                    <li><strong>Service client réactif:</strong> Assistance disponible pour répondre à vos questions et besoins.</li>
                    <li><strong>Options d'assurance complètes:</strong> Différentes formules pour une tranquillité d'esprit totale.</li>
                </ul>
                <p>Que ce soit pour un besoin personnel, professionnel ou événementiel, notre service de location de véhicules vous propose des solutions adaptées, avec des tarifs compétitifs et un service de qualité.</p>
            `,
    },
    peinture: {
      title: "Peinture & Décoration Intérieure",
      icon: "paint-roller",
      content: `
                <p>Notre service de peinture et décoration intérieure transforme vos espaces en environnements esthétiques et harmonieux.</p>
                <h4>Nos prestations incluent:</h4>
                <ul>
                    <li><strong>Peinture intérieure:</strong> Application professionnelle sur murs, plafonds et boiseries.</li>
                    <li><strong>Pose de papier peint:</strong> Installation soignée de papiers peints et revêtements muraux.</li>
                    <li><strong>Conseil en couleurs:</strong> Recommandations personnalisées pour créer l'ambiance souhaitée.</li>
                    <li><strong>Techniques décoratives:</strong> Réalisation d'effets spéciaux (stuc, patine, tadelakt, etc.).</li>
                    <li><strong>Rénovation de surfaces:</strong> Préparation et traitement des supports avant application.</li>
                    <li><strong>Décoration d'intérieur:</strong> Conseils pour l'agencement et la mise en valeur de vos espaces.</li>
                </ul>
                <p>Notre équipe de peintres et décorateurs qualifiés s'engage à réaliser des finitions impeccables et durables, transformant vos espaces selon vos goûts et vos envies.</p>
            `,
    },
    demenagement: {
      title: "Déménagement",
      icon: "box-open",
      content: `
                <p>Notre service de déménagement professionnel vous accompagne pour un changement de domicile sans stress et en toute sécurité.</p>
                <h4>Nos prestations comprennent:</h4>
                <ul>
                    <li><strong>Emballage des biens:</strong> Protection soigneuse de vos objets avec des matériaux adaptés.</li>
                    <li><strong>Transport de meubles:</strong> Manipulation et transport sécurisés de vos meubles et objets volumineux.</li>
                    <li><strong>Démontage et remontage:</strong> Service complet pour vos meubles nécessitant un assemblage.</li>
                    <li><strong>Manutention spécialisée:</strong> Équipement et techniques adaptés aux objets fragiles ou de valeur.</li>
                    <li><strong>Stockage temporaire:</strong> Solutions d'entreposage sécurisé si nécessaire.</li>
                    <li><strong>Déménagement local ou longue distance:</strong> Services adaptés à toutes les distances.</li>
                </ul>
                <p>Notre équipe expérimentée garantit un déménagement efficace et organisé, prenant soin de vos biens comme s'ils étaient les leurs, pour une installation sereine dans votre nouveau domicile.</p>
            `,
    },
    assainissement: {
      title: "Assainissement",
      icon: "water",
      content: `
                <p>Notre service d'assainissement propose des solutions complètes pour la gestion et le traitement des eaux usées et pluviales.</p>
                <h4>Nos domaines d'expertise incluent:</h4>
                <ul>
                    <li><strong>Drainage:</strong> Installation de systèmes efficaces pour l'évacuation des eaux.</li>
                    <li><strong>Traitement des eaux usées:</strong> Solutions adaptées aux normes environnementales en vigueur.</li>
                    <li><strong>Réseaux d'égouts:</strong> Construction et maintenance de réseaux collectifs et individuels.</li>
                    <li><strong>Gestion des eaux pluviales:</strong> Systèmes durables pour la collecte et le traitement des eaux de pluie.</li>
                    <li><strong>Curage et nettoyage:</strong> Entretien régulier des canalisations et fosses septiques.</li>
                    <li><strong>Diagnostic et inspection:</strong> Évaluation de l'état de vos installations existantes.</li>
                </ul>
                <p>Notre équipe d'experts en assainissement s'engage à vous proposer des solutions respectueuses de l'environnement, conformes aux réglementations et adaptées à vos besoins spécifiques.</p>
            `,
    },
    jardinage: {
      title: "Jardinage",
      icon: "leaf",
      content: `
                <p>Notre service de jardinage transforme et entretient vos espaces extérieurs pour créer des environnements verdoyants et harmonieux.</p>
                <h4>Nos prestations comprennent:</h4>
                <ul>
                    <li><strong>Entretien régulier:</strong> Tonte de pelouse, taille de haies et désherbage.</li>
                    <li><strong>Aménagement paysager:</strong> Conception et création de jardins et espaces verts.</li>
                    <li><strong>Plantation:</strong> Sélection et mise en place d'arbres, arbustes, fleurs et plantes adaptés.</li>
                    <li><strong>Systèmes d'irrigation:</strong> Installation et maintenance de systèmes d'arrosage efficaces.</li>
                    <li><strong>Terrasses et allées:</strong> Création d'espaces de vie extérieurs fonctionnels et esthétiques.</li>
                    <li><strong>Conseil horticole:</strong> Recommandations pour l'entretien et le développement de votre jardin.</li>
                </ul>
                <p>Notre équipe de jardiniers passionnés s'engage à créer et maintenir des espaces extérieurs attrayants et soignés, adaptés à vos préférences et aux conditions locales.</p>
            `,
    },
    menager: {
      title: "Entretien Ménager",
      icon: "broom",
      content: `
                <p>Notre service d'entretien ménager professionnel garantit des espaces de vie et de travail impeccables et hygiéniques.</p>
                <h4>Nos services incluent:</h4>
                <ul>
                    <li><strong>Nettoyage régulier:</strong> Entretien routinier de vos locaux selon une fréquence adaptée à vos besoins.</li>
                    <li><strong>Nettoyage en profondeur:</strong> Interventions ponctuelles pour un assainissement complet des espaces.</li>
                    <li><strong>Bureaux et commerces:</strong> Solutions adaptées aux environnements professionnels.</li>
                    <li><strong>Résidences et appartements:</strong> Services personnalisés pour les espaces de vie.</li>
                    <li><strong>Produits écologiques:</strong> Utilisation de produits respectueux de l'environnement et de la santé.</li>
                    <li><strong>Personnel qualifié:</strong> Équipe formée aux techniques professionnelles de nettoyage.</li>
                </ul>
                <p>Notre personnel qualifié s'engage à fournir un service de nettoyage méticuleux et fiable, adapté à vos exigences spécifiques, pour maintenir vos espaces dans un état de propreté irréprochable.</p>
            `,
    },
  };

  // Open modal with service details
  readMoreBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const serviceId = this.getAttribute("data-target");
      const service = serviceDetails[serviceId];

      if (service) {
        modalContent.innerHTML = `
                    <div class="modal-header">
                        <div class="modal-icon">
                            <i class="fas fa-${service.icon}"></i>
                        </div>
                        <h2>${service.title}</h2>
                    </div>
                    <div class="modal-body">
                        ${service.content}
                    </div>
                `;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
      }
    });
  });

  // Close modal
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  });

  // Business Units Carousel
  let currentSlide = 0;
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const carouselContainer = document.querySelector(".carousel-container");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  const indicatorsContainer = document.querySelector(".carousel-indicators");

  // Create indicators
  carouselSlides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) indicator.classList.add("active");

    indicator.addEventListener("click", () => {
      goToSlide(index);
    });

    indicatorsContainer.appendChild(indicator);
  });

  const indicators = document.querySelectorAll(".indicator");

  // Carousel functionality
  function goToSlide(index) {
    if (index < 0) index = carouselSlides.length - 1;
    if (index >= carouselSlides.length) index = 0;

    currentSlide = index;
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentSlide);
    });
  }

  prevBtn.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
  });

  // Auto-advance carousel
  let carouselInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);

  // Pause auto-advance on hover
  const carouselElement = document.querySelector(".business-units-carousel");
  carouselElement.addEventListener("mouseenter", () => {
    clearInterval(carouselInterval);
  });

  carouselElement.addEventListener("mouseleave", () => {
    carouselInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  });

  // Form validation
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Basic validation
    let valid = true;
    const inputs = contactForm.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "";
      }
    });

    if (valid) {
      // Here you would normally send the form data to a server
      // For demonstration, we'll just show an alert
      alert(
        "Votre message a été envoyé avec succès! Nous vous contacterons bientôt."
      );
      contactForm.reset();
    } else {
      alert("Veuillez remplir tous les champs du formulaire.");
    }
  });

  // Add smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        nav.classList.remove("active");

        // Calculate header height for offset
        const headerHeight = document.querySelector("header").offsetHeight;

        // Scroll to target with offset for fixed header
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    ".service-card, .value-card, .about-image, .vision-mission > div, .team-member"
  );

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for animations
  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Check on load and scroll
  window.addEventListener("load", checkScroll);
  window.addEventListener("scroll", checkScroll);
});
