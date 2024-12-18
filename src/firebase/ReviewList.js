import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase-config' // Firebase 설정 파일 경로에 맞게 수정하세요

function ReviewList() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reviews'))
        const reviewsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setReviews(reviewsData)
      } catch (error) {
        console.error('리뷰를 가져오는 중 오류 발생:', error)
      }
    }

    fetchReviews()
  }, [])

  return (
    <div>
      <h2>리뷰 목록</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>사용자: {review.userId}</p>
          <p>내용: {review.content}</p>
          <p>평점: {review.rating}</p>
          <p>작성일: {review.timestamp}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default ReviewList
