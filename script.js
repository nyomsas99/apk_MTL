// Array untuk menyimpan daftar peralatan
let daftarPeralatan = [];

// Fungsi untuk menambahkan format rupiah
function formatRupiah(angka) {
  return "Rp. " + angka.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Fungsi untuk mengubah angka menjadi terbilang
function angkaKeKata(angka) {
  const satuan = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];
  if (angka < 12) return satuan[angka];
  else if (angka < 20) return angkaKeKata(angka - 10) + " Belas";
  else if (angka < 100)
    return (
      angkaKeKata(Math.floor(angka / 10)) + " Puluh " + angkaKeKata(angka % 10)
    );
  else if (angka < 200) return "Seratus " + angkaKeKata(angka - 100);
  else if (angka < 1000)
    return (
      angkaKeKata(Math.floor(angka / 100)) +
      " Ratus " +
      angkaKeKata(angka % 100)
    );
  else if (angka < 2000) return "Seribu " + angkaKeKata(angka - 1000);
  else if (angka < 1000000)
    return (
      angkaKeKata(Math.floor(angka / 1000)) +
      " Ribu " +
      angkaKeKata(angka % 1000)
    );
  else if (angka < 1000000000)
    return (
      angkaKeKata(Math.floor(angka / 1000000)) +
      " Juta " +
      angkaKeKata(angka % 1000000)
    );
  return "";
}

// Fungsi untuk konversi total ke bentuk terbilang
function terbilang(total) {
  return angkaKeKata(Math.floor(total)) + " Rupiah";
}

// Fungsi untuk menambah peralatan ke daftar
function tambahPeralatan() {
  const namaPeralatan = document.getElementById("nama_peralatan").value;
  const jumlahPeralatan = parseInt(
    document.getElementById("jumlah_peralatan").value
  );
  const kapasitas = parseInt(document.getElementById("kapasitas").value);
  const lamaPemakaian = parseInt(
    document.getElementById("lama_pemakaian").value
  );
  const golongan = parseFloat(document.getElementById("golongan").value);

  if (!namaPeralatan || !jumlahPeralatan || !kapasitas || !lamaPemakaian) {
    alert("Mohon lengkapi semua data peralatan!");
    return;
  }

  const totalBeban = jumlahPeralatan * kapasitas * lamaPemakaian;
  const totalDaya = totalBeban / 1000;
  const cost = totalDaya * golongan * 30;

  daftarPeralatan.push({ namaPeralatan, totalDaya, cost });

  document.getElementById(
    "output"
  ).innerHTML += `<p>${namaPeralatan}: ${formatRupiah(cost)} (${terbilang(
    cost
  )})</p>`;
}

// Fungsi untuk menghitung total tagihan semua peralatan
function hitungTotalTagihan() {
  if (daftarPeralatan.length === 0) {
    alert("Tambahkan peralatan terlebih dahulu!");
    return;
  }

  let totalTagihan = daftarPeralatan.reduce(
    (total, item) => total + item.cost,
    0
  );

  document.getElementById("output").innerHTML += `
        <p><b>Total Tagihan Listrik:</b> ${formatRupiah(totalTagihan)}</p>
        <p><b>Terbilang:</b> ${terbilang(totalTagihan)}</p>
    `;
}
function hitungTotalTagihan() {
  const namaPeralatan = document
    .getElementById("nama_peralatan")
    .value.split(",");
  const jumlahPeralatan = document
    .getElementById("jumlah_peralatan")
    .value.split(",")
    .map(Number);
  const kapasitas = document
    .getElementById("kapasitas")
    .value.split(",")
    .map(Number);
  const lamaPemakaian = document
    .getElementById("lama_pemakaian")
    .value.split(",")
    .map(Number);
  const golongan = parseFloat(document.getElementById("golongan").value);

  if (
    namaPeralatan.length !== jumlahPeralatan.length ||
    namaPeralatan.length !== kapasitas.length ||
    namaPeralatan.length !== lamaPemakaian.length
  ) {
    alert(
      "Jumlah data peralatan, kapasitas, dan lama pemakaian harus konsisten!"
    );
    return;
  }

  let totalTagihan = 0;
  let tableRows = "";

  for (let i = 0; i < namaPeralatan.length; i++) {
    const beban = jumlahPeralatan[i] * kapasitas[i] * lamaPemakaian[i];
    const daya = beban / 1000;
    const biaya = daya * golongan * 30;
    totalTagihan += biaya;

    tableRows += `
            <tr>
                <td>${i + 1}</td>
                <td>${namaPeralatan[i].trim()}</td>
                <td>${jumlahPeralatan[i]}</td>
                <td>${lamaPemakaian[i]}</td>
                <td>${kapasitas[i]}</td>
                <td>${golongan}</td>
                <td>${formatRupiah(biaya)}</td>
            </tr>
        `;
  }

  document.getElementById("outputBody").innerHTML = tableRows;
  document.getElementById("totalTagihan").innerText =
    formatRupiah(totalTagihan);
  document.getElementById("totalTerbilang").innerText = terbilang(totalTagihan);

  document.querySelector(".container").style.display = "none";
  document.getElementById("output").style.display = "block";
}
