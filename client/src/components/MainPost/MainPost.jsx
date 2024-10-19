import "./MainPost.scss";
function MainPost({ children, className}) {

  return (
    <>
        <div className="MainPost">
            <div className="MainPost__block1">
                <h2 className="MainPost__text">Арт-студия </h2>
                <h2 className="MainPost__text MainPost__text--fs50">Создавайте свои шедевры </h2>
                <h2 className="MainPost__text">А мы вам поможем</h2>
            </div>
        </div>
    </>
  )
}

export default MainPost