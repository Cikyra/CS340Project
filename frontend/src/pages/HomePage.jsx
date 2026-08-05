
const backendURL = import.meta.env.VITE_BACKEND_URL


function HomePage() {
  const handleReset = async (e) => {
    e.preventDefault();
    const confirmed = confirm("This will erase all current data and restore sample data. Proceed?")
    if(!confirmed) return;

    try{
      const response = await fetch(`${backendURL}/reset`,{
        method: 'POST'
      });
      if (response.ok) {
        alert('Database reset successful.');
      }else{
        alert('Database reset failed.');
      }
    }catch(error){
      console.error('Error resetting database.', error);
    }
  };

  return (
    <section className="page-section">
      <h2>For all your library needs</h2>
      <p>Use the navigation links to manage various aspects of the library.</p>
      <button onClick={handleReset}>RESET DATABASE</button>
      <p>Group 21 - Laura Riley & Jake Pruett</p>
    </section>
  );

}
export default HomePage;