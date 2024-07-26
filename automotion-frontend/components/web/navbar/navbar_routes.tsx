import React from 'react'

const NavbarRoutes = ({routes}:{routes:{name: string, href: string}[]}) => {
  return (
    <ul className="flex">
		{routes.map((route, i) => (
			<li key={i}>
				<a
					className={`px-4`}
					href={route.href}
				>
					{route.name}
				</a>
			</li>
		))}
	</ul>
  )
}

export default NavbarRoutes