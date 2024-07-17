"use client"

const Profile = ({user}) => {
  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">My Profile</h4>
          </div>
          <div className="rbt-profile-row row row--15">
            <div className="col-lg-4 col-md-4">
              <div className="rbt-profile-content b2">Registration Date</div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="rbt-profile-content b2">
                {user.register_date}
              </div>
            </div>
          </div>
          <div className="rbt-profile-row row row--15 mt--15">
            <div className="col-lg-4 col-md-4">
              <div className="rbt-profile-content b2">Name</div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="rbt-profile-content b2">{user.lastname ? `${user.firstname} ${user.lastname}` : user.firstname}</div>
            </div>
          </div>
          <div className="rbt-profile-row row row--15 mt--15">
            <div className="col-lg-4 col-md-4">
              <div className="rbt-profile-content b2">Username</div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="rbt-profile-content b2">instructor</div>
            </div>
          </div>
          <div className="rbt-profile-row row row--15 mt--15">
            <div className="col-lg-4 col-md-4">
              <div className="rbt-profile-content b2">Email</div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="rbt-profile-content b2">{user.email}</div>
            </div>
          </div>
          <div className="rbt-profile-row row row--15 mt--15">
            <div className="col-lg-4 col-md-4">
              <div className="rbt-profile-content b2">Phone Number</div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="rbt-profile-content b2">{user.phone}</div>
            </div>
          </div>
          <div className="rbt-profile-row row row--15 mt--15">
            <div className="col-lg-4 col-md-4">
              <div className="rbt-profile-content b2">Skill/Occupation</div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="rbt-profile-content b2">
                Application Developer
              </div>
            </div>
          </div>
          <div className="rbt-profile-row row row--15 mt--15">
            <div className="col-lg-4 col-md-4">
              <div className="rbt-profile-content b2">Biography</div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="rbt-profile-content b2">
              {user.bio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
