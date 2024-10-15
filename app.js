// Ambil elemen yang dibutuhkan
let List = document.querySelector("ul.list");
let btnAdd = document.getElementById("btnAdd");
let ListTask = [];

// Memuat task dari localStorage jika ada
if (localStorage.getItem("listTask") != null) {
  ListTask = JSON.parse(localStorage.getItem("listTask"));
}

// Fungsi untuk menyimpan ke localStorage
function saveLocalStorage() {
  localStorage.setItem("listTask", JSON.stringify(ListTask));
}

// Fungsi untuk menambahkan task baru ke dalam HTML
function addTaskToHTML() {
  List.innerHTML = ""; // Kosongkan list task sebelum render ulang

  // Loop untuk setiap task dalam ListTask
  ListTask.forEach((task, index) => {
    let newTask = document.createElement("li");
    newTask.classList.add(task.status); // Tambah kelas berdasarkan status
    newTask.innerHTML = `
      <div class="complate-icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5L11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <div class="content">${task.content}</div>
      <div class="close-icon" onclick="deleteTask(${index})">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L17.94 6M18 18L6.06 6" />
        </svg>
      </div>
    `;

    // Tambahkan elemen li baru ke dalam ul.list
    List.appendChild(newTask);
  });
}

// Fungsi untuk menghapus task
function deleteTask(index) {
  ListTask.splice(index, 1); // Hapus task dari array
  addTaskToHTML(); // Render ulang daftar task
  saveLocalStorage(); // Simpan perubahan ke localStorage
}

// Event listener untuk tombol tambah task
btnAdd.onclick = function (event) {
  event.preventDefault(); // Mencegah reload halaman

  let content = document.getElementById("task").value.trim(); // Ambil nilai dari textarea
  if (content !== "") {
    // Tambahkan task baru ke array ListTask
    ListTask.unshift({
      content: content,
      status: "doing",
    });

    // Update tampilan HTML
    addTaskToHTML();

    // Kosongkan input setelah task ditambahkan
    document.getElementById("task").value = "";

    // Simpan task ke localStorage
    saveLocalStorage();
  } else {
    alert("Please enter a valid task!"); // Validasi jika input kosong
  }
};

// Render task saat halaman dimuat
addTaskToHTML();
