function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

function toggleDarkMode() {
  const body = document.body;
  const toggleBtn = document.getElementById("darkToggle").querySelector("i");
  const toggleBtnNav = document.getElementById("darkToggleNav").querySelector("i");
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    if(toggleBtn) {
      toggleBtn.classList.remove("fa-moon");
      toggleBtn.classList.add("fa-sun");
    }
    if(toggleBtnNav) {
      toggleBtnNav.classList.remove("fa-moon");
      toggleBtnNav.classList.add("fa-sun");
    }
  } else {
    if(toggleBtn) {
      toggleBtn.classList.remove("fa-sun");
      toggleBtn.classList.add("fa-moon");
    }
    if(toggleBtnNav) {
      toggleBtnNav.classList.remove("fa-sun");
      toggleBtnNav.classList.add("fa-moon");
    }
  }
}

// Fungsi untuk mengupdate posisi garis bawah
function updateNavUnderline() {
  const underline = document.getElementById('nav-underline');
  const menuItems = document.querySelectorAll('.menu a');
  const sections = document.querySelectorAll('section, header');
  
  // Cari section yang sedang aktif
  let currentSection = '';
  let scrollPosition = window.scrollY;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Offset untuk navbar fixed
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Temukan menu item yang sesuai dengan section aktif
  menuItems.forEach(item => {
    const href = item.getAttribute('href').substring(1); // Hilangkan # dari href
    
    if (href === currentSection) {
      const itemRect = item.getBoundingClientRect();
      const menuRect = item.parentElement.getBoundingClientRect();
      
      // Atur posisi dan lebar garis bawah
      underline.style.width = `${itemRect.width}px`;
      underline.style.left = `${itemRect.left - menuRect.left}px`;
    }
  });
}

// Panggil fungsi saat halaman dimuat dan di-scroll
document.addEventListener('DOMContentLoaded', function() {
  // Inisialisasi garis bawah di Home saat halaman pertama kali dimuat
  setTimeout(() => {
    updateNavUnderline();
  }, 100);
  
  // Update garis bawah saat di-scroll
  window.addEventListener('scroll', updateNavUnderline);
  
  // Update garis bawah saat ukuran window berubah
  window.addEventListener('resize', updateNavUnderline);
});

const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentProjectImages = [];
let currentIndex = 0;

document.querySelectorAll(".project-box").forEach(box => {
  box.addEventListener("click", () => {
    modal.style.display = "flex";

    const title = box.dataset.title;
    const desc = box.dataset.desc;
    currentProjectImages = JSON.parse(box.dataset.images);
    currentIndex = 0;

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImg.src = currentProjectImages[currentIndex];
  });
});

closeBtn.onclick = () => { modal.style.display = "none"; };
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
  modalImg.src = currentProjectImages[currentIndex];
};
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentProjectImages.length;
  modalImg.src = currentProjectImages[currentIndex];
};
window.onclick = e => { if(e.target === modal) modal.style.display = "none"; };