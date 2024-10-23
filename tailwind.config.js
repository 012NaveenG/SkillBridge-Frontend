/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        TK_bg:'#030112',
        TK_Text:'#2F4F4F',
        TK_Gray:'#2F4F4F',
        dodgerBlue:'#1E90FF',
        Tk_Footer:'#F0F0F0',
        TK_Error:'#FF0000',
        TK_Success:'#10EF26'
      }
    },
  },
  plugins: [],
}

