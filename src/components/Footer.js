import React from 'react';

const date = new Date();

export default function Footer() {
  return (
    <footer className="footer">
      <p>Faran Mohammad &copy; {date.getFullYear()}</p>
    </footer>
  );
}
