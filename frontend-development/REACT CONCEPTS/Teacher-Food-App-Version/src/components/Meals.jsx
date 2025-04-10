import MealItem from "./MealItem.jsx";
import useHttp from "./useHttp.jsx";
import Error from "./UI/Error.jsx";

const requestConfig = {};
export default function Meals() {
  const {
    data: loadMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  console.log("The fetched Data", loadMeals);
  console.log("Loading State", isLoading);

  if (isLoading) {
    return <p className="center">Fetching Data...</p>;
  }

  if (error) {
    return <Error title="Failed to Fetch Meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadMeals?.length > 0 &&
        loadMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  );
}

//alternative of [] is

//if(!data){
//  return <p>The array is empty</p>
//}
