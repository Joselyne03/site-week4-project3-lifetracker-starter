import "./ActivityPage.css"

export default function ActivityPage({appState}){
    return (
    <div className="activity">
       {appState ? (
            <>
            <h1 className="nutrition-Header">you logged in! yay</h1>
            </>
            ) : (
            <> 
            <h1 className="nutrition-Header">You must login to gain access!</h1>
            </>
            )}
    </div>
    )
   
}