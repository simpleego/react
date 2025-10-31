import React, { useState, useEffect } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]); // 영화 목록을 저장할 배열

  useEffect(() => {
    // 실제로는 여기서 API 호출 등으로 영화 데이터를 가져올 거야
    const fetchMovies = async () => {
      // 가상의 영화 데이터
      const dummyMovies = [
        { id: 1, title: "별빛 바다 탐험대", genre: "애니메이션", price: 12000 },
        { id: 2, title: "도시의 그림자", genre: "액션", price: 15000 },
        { id: 3, title: "시간 여행자의 일기", genre: "판타지", price: 13000 },
      ];
      setMovies(dummyMovies); // 가져온 데이터를 상태에 저장
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>상영중인 영화</h2>
      {movies.map(movie => (
        <div key={movie.id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>{movie.title}</h3>
          <p>장르: {movie.genre}</p>
          <p>가격: {movie.price}원</p>
          <button onClick={() => alert(`${movie.title} 예매하기!`)}>예매하기</button>
        </div>
      ))}
    </div>
  );
}

export default MovieList;