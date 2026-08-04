const toggleBtn = document.getElementById("toggleBtn");
const menu = document.getElementById("menu");

toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
     toggleBtn.classList.toggle("buttonactive");
});

document.querySelectorAll(".add-to-cart-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("/cart/add.js", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert("Unable to add product.");
      return;
    }

    const cart = await fetch("/cart.js").then((res) => res.json());

    document.getElementById("cart-count").textContent = cart.item_count;

    console.log("Added successfully!");
  });
});


const header = document.getElementById("headertop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("fixed", "top-0", "left-0", "w-full", "z-50", "bg-white", "shadow-md");
  } else {
    header.classList.remove("fixed", "top-0", "left-0", "w-full", "z-50", "bg-white", "shadow-md");
  }
});

function openRightMenu() {
  document.getElementById("rightMenu").style.display = "block";
  loadCart();
}

function closeRightMenu() {
  document.getElementById("rightMenu").style.display = "none";
}
async function loadCart() {
    const response = await fetch("/cart.js");
    const cart = await response.json();

    console.log("Total items:", cart.items.length);
    console.log(cart);

    let html = "";

    cart.items.forEach(item => {
        html += `
  <div class="relative flex gap-3 border-b pb-3 mb-3">

    <button
      onclick="removeFromCart('${item.key}')"
      class="absolute top-0 right-0 text-gray-500 hover:text-red-600 text-xl font-bold">
      &times;
    </button>

    <img
      class="w-20 h-20 object-cover"
      src="${item.image}"
      width="80"
      height="80">

    <div class="text-start pr-6">
      <h4 class="text-base font-medium">
        ${
          item.product_title.length > 30
            ? item.product_title.substring(0, 30) + "..."
            : item.product_title
        }
      </h4>

      <p>Quantity: ${item.quantity}</p>
      <p>Price: ${item.final_line_price / 100}</p>
    </div>

  </div>
`;
    });

    document.getElementById("cart-items").innerHTML = html;
}
async function removeFromCart(key) {
  const response = await fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: key,
      quantity: 0
    })
  });

  if (response.ok) {
    loadCart();
  }
}

const searchToggle = document.getElementById("searchToggle");
const searchBox = document.getElementById("searchBox");

searchToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent document click
  searchBox.classList.toggle("hidden");
});

searchBox.addEventListener("click", (e) => {
  e.stopPropagation(); // Keep box open when clicking inside
});

document.addEventListener("click", () => {
  searchBox.classList.add("hidden");
});