import React, { useEffect, useState } from 'react';

const Card = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState({});
  const [countdown, setCountdown] = useState({});

  const calculateTimeLeft = (releaseDate) => {
    const now = new Date();
    const timeDiff = new Date(releaseDate) - now;

    if (timeDiff <= 0) {
      return "Available Now";
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

    return `${days} Day : ${hours} Hour `;
  };

  const updateCountdown = (index, releaseDate) => {
    const newCountdown = calculateTimeLeft(releaseDate);

    setCountdown((prev) => ({
      ...prev,
      [index]: newCountdown,
    }));

    if (newCountdown !== "Available Now") {
      setTimeout(() => {
        updateCountdown(index, releaseDate);
      }, 1000);
    }
  };

  const toggleFavorite = (index) => {
    setIsFavorite((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
//fetch automatically
  useEffect(() => {
    data.forEach((item, index) => {
      updateCountdown(index, item.date);
    });
  }, [data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4">
  {data.map((item, index) => (
    <div
      key={index}
      className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 p-6 flex flex-col space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
        {item.title}
      </h2>
      <p className="text-gray-700 italic">🎭 Cast: {item.cast}</p>
      <p className="text-gray-600">📅 Release Date: {new Date(item.date).toLocaleDateString()}</p>
      <p className={`text-lg font-semibold ${
          countdown[index] === "Available Now"
            ? "text-green-600"
            : "text-blue-600"
        }`}>
        ⏳ Time until released: {countdown[index]}
      </p>
      <p className="text-gray-700 font-medium">🎬 Genre: {item.genre}</p>
      <div className="flex space-x-4 items-center">
        <button
          onClick={() => toggleFavorite(index)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${
            isFavorite[index]
              ? "bg-red-100 text-red-500 hover:bg-red-200"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition duration-200`}
        >
          {isFavorite[index] ? "❤️ Whitelisted" : "🤍 Add to Whitelist"}
        </button>
        {countdown[index] === "Available Now" && (
          <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-200">
            📚 Available Now!
          </button>
        )}
      </div>
    </div>
  ))}
</div>

  );
};

export default Card;
