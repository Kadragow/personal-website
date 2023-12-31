import React from 'react';
import './Menu.scss';
import routes from '@/constants/routes';
import MenuLink from '@/components/atoms/MenuLink/MenuLink';
import Route from '@/core/models/route';
import BlurryContainer from '@/components/molecules/BlurryContainer/BlurryContainer';

const Menu = () => {
  const menuItems: React.ReactNode[] = routes.map((el: Route) => (
    <MenuLink
      label={el.label}
      href={el.href}
      className="menu--link-item"
      key={el.href}
    />
  ));

  return (
    <nav className="menu">
      <BlurryContainer className="menu--container">{menuItems}</BlurryContainer>
    </nav>
  );
};

export default Menu;
