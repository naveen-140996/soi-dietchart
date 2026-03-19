import React from 'react'

const Footer = () => {
  return (
     <footer className="bg-white mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Soi Organic Diet App 💚  
        <br />
        Stay Healthy • Stay Fit
      </div>
    </footer>
  )
}

export default Footer