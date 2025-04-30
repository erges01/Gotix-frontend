'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { api } from '@/utils/api'


interface Attendee {
  email: string;
  qrCodeUrl: string;
}

interface Order {
  attendees?: Attendee[];
  [key: string]: any;
}


export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [order, setOrder] = useState<Order | null>(null);


  useEffect(() => {
    if (!orderId) return
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`)
        setOrder(res.data.data.order)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch order')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  const handleDownload = async () => {
    try {
      const res = await api.get(`/orders/download/${orderId}`, {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ticket.pdf')
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      alert('Download failed!')
    }
  }

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="text-red-600 p-4">{error}</p>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Order Successful</h1>
      <p className="mb-4">Thank you for your purchase, your ticket details are below.</p>

      {order?.attendees?.map((att, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-4 mb-4 border">
          <p><strong>Attendee:</strong> {att.email}</p>
          <img src={att.qrCodeUrl} alt="QR Code" className="w-40 mt-2" />
        </div>
      ))}

      <button
        onClick={handleDownload}
        className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
         Download Ticket (PDF)
      </button>
    </div>
  )
}
