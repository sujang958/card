import React, { FC } from "react"
React.useLayoutEffect = React.useEffect

const Layout: FC = ({ children }) => {
  return (
    <div className="min-h-screen min-w-full font-ubuntu">
      <div>{children}</div>
    </div>
  )
}

export default Layout
