const WorkoutSessions = () => {
  return (
    <section className="workout_session">
      <div className="wrapper">
        <h1>TOP WORKOUT SESSION</h1>
        <p>
          Power-packed sessions designed for muscle building, fat loss, and cardio endurance.
        </p>
        <img src="/img5.jpg" alt="People doing a workout session" />
      </div>

      <div className="wrapper">
        <h1>FEATURED BOOTCAMPS</h1>
        <p>
          Join our best bootcamps for personalized training, nutrition, and results!
        </p>
        <div className="bootcamps">
          <div className="bootcamp-card">
            <h4>HIIT Training</h4>
            <p>Quick, high-intensity workouts designed to burn calories fast.</p>
          </div>
          <div className="bootcamp-card">
            <h4>Strength Camp</h4>
            <p>Weight-based bootcamp for building lean muscle and core power.</p>
          </div>
          <div className="bootcamp-card">
            <h4>Cardio Burn</h4>
            <p>Explosive cardio sessions to boost heart health and stamina.</p>
          </div>
          <div className="bootcamp-card">
            <h4>Yoga & Flexibility</h4>
            <p>Low-impact sessions focused on flexibility and mental clarity.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutSessions;
