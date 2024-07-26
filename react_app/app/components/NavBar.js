// app/components/NavBar.js
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: '#fff' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/upload" style={{ color: '#fff', textDecoration: 'none' }}>Upload</Link>
        </li>
        <li>
          <Link href="/images" style={{ color: '#fff', textDecoration: 'none' }}>Images</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
