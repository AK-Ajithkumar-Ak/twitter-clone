
function Loadingspinner({size= "md"}) {
    const sizeClass=  `loading-${size}`

  return <span className={`loading loading-spinner ${sizeClass}`}></span>
}

export default Loadingspinner