const convertPriceToNumber = (priceString) => {
  // Menghilangkan karakter non-angka (seperti titik dan Rp)
  const numericString = priceString.replace(/[^\d]/g, "");

  // Mengonversi string menjadi angka
  const priceNumber = parseInt(numericString, 10);

  return priceNumber;
};

const formatPrice = (priceNumber) => {
  // Mengonversi angka menjadi string dan menambahkan format
  const formattedPrice = `Rp. ${priceNumber.toLocaleString("id-ID")}`;

  return formattedPrice;
};

export default { convertPriceToNumber, formatPrice };
