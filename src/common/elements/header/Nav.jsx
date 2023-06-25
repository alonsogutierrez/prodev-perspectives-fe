import Link from 'next/link';

const filters = [
  {
    id: 1,
    cate: 'Programming Foundations',
    route: '/programming-foundations',
  },
  {
    id: 2,
    cate: 'Software Architecture',
    route: '/software-architecture',
  },
  {
    id: 3,
    cate: 'Development Domains',
    route: '/development-domains',
  },
  {
    id: 4,
    cate: 'Professional Growth',
    route: '/professional-growth',
  },
];

const Nav = ({}) => {
  return (
    <>
      <ul className='mainmenu'>
        <li className='menu-item-has-children'>
          <Link href='/'>Home</Link>
        </li>
        <li className='menu-item-has-children'>
          <Link href='#'>
            <a>Topics</a>
          </Link>
          <ul className='axil-submenu'>
            {filters.map((filter) => (
              <li key={filter.id}>
                <Link href={filter.route}>{filter.cate}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className='menu-item-has-children'>
          <Link href='/about'>About Me</Link>
        </li>
        <li className='menu-item-has-children'>
          <Link href='/contact'>Contact</Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;
