'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCart } from './productSlice'

export function CartLoader() {
  const dispatch = useDispatch()

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      dispatch(setCart(JSON.parse(saved)))
    }
  }, [dispatch])

  return null
}
