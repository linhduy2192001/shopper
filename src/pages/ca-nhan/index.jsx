import Button from "@/components/Button";
import Field from "@/components/Field";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { logoutAction, setUserAction } from "@/stories/auth";
import React from "react";
import { handleError, regexp, require } from "@/utils";
import { useDispatch } from "react-redux";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user.services";
import { message } from "antd";

const rules = {
  name: [require()],
  phone: [require(), regexp("phone")],
};

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userForm = useForm(rules, { initialValue: user });

  const { loading, refetch: updateProfileService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.updateProfile(...params),
  });

  const onSubmit = async () => {
    try {
      if (userForm.validate()) {
        const res = await updateProfileService(userForm.values);
        dispatch(setUserAction(res.data));

        message.success("Cập nhật thông tin tài khoản thành công!");
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <section className="pb-12 pt-7">
      <div className="container">
        <div className="row">
          <div className="text-center col-12">
            {/* Heading */}
            <h3 className="mb-10">Thông tin cá nhân</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            {/* Nav */}
            <nav className="mb-10 mb-md-0">
              <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                <a
                  className="list-group-item list-group-item-action dropright-toggle "
                  href="account-orders.html"
                >
                  Theo dõi đơn hàng
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle "
                  href="account-personal-info.html"
                >
                  Thông tin cá nhân
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle active"
                  href="account-wishlist.html"
                >
                  Sản phẩm yêu thích
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle "
                  href="account-address.html"
                >
                  Sổ địa chỉ
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle "
                  href="account-payment.html"
                >
                  Sổ thanh toán
                </a>
                <a
                  onClick={(ev) => {
                    ev.preventDefault(), dispatch(logoutAction());
                  }}
                  className="list-group-item list-group-item-action dropright-toggle"
                  href="#!"
                >
                  Đăng xuất
                </a>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
            {/* Form */}
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="profile-avatar">
                    <div className="wrap">
                      <img src="./img/avt.png" />
                      <i className="icon">
                        <img src="./img/icons/icon-camera.svg" />
                      </i>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  {/* Email */}
                  <Field
                    label="Full Name *"
                    placeholder="Full Name *"
                    {...userForm.register("name")}
                  />
                </div>
                <div className="col-md-6">
                  {/* Email */}
                  <Field
                    label="Phone Number *"
                    placeholder="Phone Number *"
                    {...userForm.register("phone")}
                  />
                </div>
                <div className="col-md-6">
                  {/* Email */}
                  <Field
                    label="Email Address *"
                    placeholder="Email Address *"
                    {...userForm.register("username")}
                    disabled
                  />
                </div>
                <div className="col-12 col-md-12">
                  {/* Password */}
                  <div className="form-group">
                    <label htmlFor="accountPassword">Current Password</label>
                    <input
                      className="form-control form-control-sm"
                      id="accountPassword"
                      type="password"
                      placeholder="Current Password"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="AccountNewPassword">New Password</label>
                    <input
                      className="form-control form-control-sm"
                      id="AccountNewPassword"
                      type="password"
                      placeholder="New Password"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="AccountNewPassword">Conform Password</label>
                    <input
                      className="form-control form-control-sm"
                      id="AccountNewPassword"
                      type="password"
                      placeholder="Conform Password"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      placeholder="dd/mm/yyyy"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  {/* Gender */}
                  <div className="mb-8 form-group">
                    <label>Gender</label>
                    <div className="btn-group-toggle" data-toggle="buttons">
                      <label className="btn btn-sm btn-outline-border active">
                        <input type="radio" name="gender" defaultChecked /> Male
                      </label>
                      <label className="btn btn-sm btn-outline-border">
                        <input type="radio" name="gender" /> Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  {/* Button */}
                  <Button onClick={onSubmit} loading={loading}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
