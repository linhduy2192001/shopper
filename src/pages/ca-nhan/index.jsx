import Button from "@/components/Button";
import Field from "@/components/Field";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { logoutAction, setUserAction } from "@/stories/auth";
import React, { useRef, useState } from "react";
import {
  confirm,
  handleError,
  minmax,
  regexp,
  require,
  validate,
} from "@/utils";
import { useDispatch } from "react-redux";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user.services";
import { DatePicker, message } from "antd";
import _ from "lodash";
import { object } from "@/utils/object";
import { avatarDefault } from "@/config/asset";
import { fileService } from "@/services/file.service";
import { UploadFile } from "@/components/UploadFile";
import dayjs from "dayjs";
import Radio from "@/components/Radio";
import Portal from "@/components/Portal";
import { PROFILE_TITLE_ID } from "@/config";

const rules = {
  name: [require()],
  phone: [require(), regexp("phone")],
  currentPassword: [
    (_, forms) => {
      if (forms.newPassword) {
        const errorObj = validate(
          {
            currentPassword: [require(), minmax(6, 32)],
          },
          forms
        );
        return errorObj.currentPassword;
      }
    },
  ],
  newPassword: [
    (value, forms) => {
      if (forms.currentPassword) {
        if (forms.currentPassword === value)
          return "Vui lòng không điền giống mất khẩu cũ";
        const errorObj = validate(
          {
            newPassword: [require(), minmax(6, 32)],
          },
          forms
        );
        return errorObj.newPassword;
      }
    },
  ],
  confirmPassword: [confirm("newPassword")],
};

export default function Profile() {
  const fileRef = useRef();

  const dispatch = useDispatch();
  const { user } = useAuth();
  const userForm = useForm(rules, { initialValue: user });
  console.log(userForm.values);

  const { loading, refetch: updateProfileService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.updateProfile(...params),
  });

  const { loading: changePasswordLoading, refetch: changePasswordService } =
    useQuery({
      enabled: false,
      queryFn: ({ params }) => userService.changePassword(...params),
    });

  const onSubmit = async () => {
    const checkOldData = object.isEqual(
      user,
      userForm.values,
      "name",
      "phone",
      "birthday",
      "gender"
    );

    let avatar;

    if (fileRef.current) {
      const res = await fileService.uploadFile(fileRef.current);
      if (res.link) {
        avatar = res.link;
      }
    }

    if (!avatar && !userForm.values.newPassword && checkOldData) {
      message.warning("Vui lòng nhập thông tin để thay đổi");
      return;
    }

    if (userForm.validate()) {
      if (avatar || !checkOldData) {
        updateProfileService({
          ...userForm.values,
          avatar,
        })
          .then((res) => {
            dispatch(setUserAction(res.data));
            fileRef.current = null;
            message.success("Cập nhật thông tin tài khoản thành công!");
          })
          .catch(handleError);
      }

      if (userForm.values.newPassword) {
        changePasswordService({
          newPassword: userForm.values.newPassword,
          currentPassword: userForm.values.currentPassword,
        })
          .then((res) => {
            userForm.setValues({
              newPassword: "",
              currentPassword: "",
              confirmPassword: "",
            });
            message.success("Thay đổi mật khẩu thành công!");
          })
          .catch(handleError);
      }
    }
  };

  return (
    <div>
      <Portal selector={PROFILE_TITLE_ID}>Thông tin cá nhân</Portal>
      <div className="row">
        <div className="col-12">
          <UploadFile onChange={(file) => (fileRef.current = file)}>
            {(previewSrc, trigger) => (
              <div className="profile-avatar">
                <div className="wrap" onClick={trigger}>
                  <img src={previewSrc || user.avatar || avatarDefault} />
                  <i className="icon">
                    <img src="./img/icons/icon-camera.svg" />
                  </i>
                </div>
              </div>
            )}
          </UploadFile>
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
          <Field
            type="password"
            label="Current Password"
            placeholder="Current Password"
            {...userForm.register("currentPassword")}
            autoComplete="new-password"
          />
        </div>
        <div className="col-12 col-md-6">
          <Field
            type="password"
            label="New Password"
            placeholder="New Password"
            {...userForm.register("newPassword")}
            autoComplete="new-password"
          />
        </div>
        <div className="col-12 col-md-6">
          <Field
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            {...userForm.register("confirmPassword")}
            autoComplete="new-password"
          />
        </div>
        <div className="col-12 col-lg-6">
          <Field
            label="Date of Birth"
            {...userForm.register("birthday")}
            renderField={(props) => (
              <DatePicker
                format="DD/MM/YYYY"
                value={props.value ? dayjs(props.value) : undefined}
                onChange={(ev, date) => props?.onChange?.(date)}
                className="form-control form-control-sm"
              />
            )}
          />
        </div>
        <div className="col-12 col-lg-6">
          {/* Gender */}
          <Field
            {...userForm.register("gender")}
            label="Gender"
            renderField={(props) => (
              <div className="btn-group-toggle">
                <Radio.Group
                  defaultValue={props.value}
                  onChange={(value) => props?.onChange?.(value)}
                >
                  <Radio.Toggle value="male">Male</Radio.Toggle>
                  <Radio.Toggle value="female">Female</Radio.Toggle>
                </Radio.Group>
              </div>
            )}
          />
        </div>
        <div className="col-12">
          {/* Button */}
          <Button onClick={onSubmit} loading={loading}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
