import { useParams } from "react-router-dom";


const ReviesPage = () => {
    const { productId } = useParams();

  return (
    <div>ReviesPage { productId } </div>
  )
}

export default ReviesPage