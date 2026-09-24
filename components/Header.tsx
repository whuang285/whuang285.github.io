import Link from 'next/link';
export function Header(){return <header className="site-header"><div className="nav-wrap"><Link className="brand" href="/">WH<span>.</span></Link><nav><Link href="/">Home</Link><Link href="/blog/">Writing</Link><Link href="/about/">About</Link></nav></div></header>}
