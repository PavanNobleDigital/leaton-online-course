const UserOrderHistoryTable = ({order_history}) => {
  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">Order History</h4>
          </div>

          <div className="rbt-dashboard-table table-responsive mobile-table-750">
            <table className="rbt-table table table-borderless">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Course Name</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
              {order_history ? 
              
              order_history.slice(0, 3)?.map((details, index) => (

                    <tr>
                      <th>{details.order_num}</th>
                      <td>{details.course_name}</td>
                      <td>{details.purchase_date}</td>
                      <td>${details.price}</td>
                      <td>
                        <span className="rbt-badge-5 bg-color-success-opacity color-success">
                        {details.status}
                        </span>
                      </td>
                    </tr>
                ))
              
              :
              
              <tr>
                <td>No Order history</td>
              </tr>
              
              
              }  


                {/* <tr>
                  <th>#5478</th>
                  <td>App Development</td>
                  <td>January 27, 2022</td>
                  <td>$100.99</td>
                  <td>
                    <span className="rbt-badge-5 bg-color-success-opacity color-success">
                      Success
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>#4585</th>
                  <td>Graphic</td>
                  <td>May 27, 2022</td>
                  <td>$200.99</td>
                  <td>
                    <span className="rbt-badge-5 bg-primary-opacity">
                      Processing
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>#9656</th>
                  <td>Graphic</td>
                  <td>March 27, 2022</td>
                  <td>$200.99</td>
                  <td>
                    <span className="rbt-badge-5 bg-color-warning-opacity color-warning">
                      On Hold
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>#2045</th>
                  <td>Application</td>
                  <td>March 27, 2022</td>
                  <td>$200.99</td>
                  <td>
                    <span className="rbt-badge-5 bg-color-danger-opacity color-danger">
                      Canceled
                    </span>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrderHistoryTable;
