import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../componrnts/layout";
// import Header from "../../components/layouts/header";
// import Menu from "../../components/layouts/menu";
import MaterialTable, { Action } from "material-table";
import { products } from "../api/dummy";
import { Typography, makeStyles } from "@material-ui/core";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { Edit, DeleteOutline } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "formik-material-ui";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  field: {
    marginTop: 16,
  },
  card: {
    padding: 20,
  },
}));

interface Props {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const StockEdit = ({ id, name, price, stock }: Props) => {
  const classes = useStyles();

  const showPreviewImage = (values) => {
    if (values.file_obj) {
      return (
        <img src={values.file_obj} style={{ height: 100, marginTop: 16 }} />
      );
    }
  };

  const showForm = ({ values, setFieldValue, isValid, dirty }) => {
    return (
      <Form>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h3">
              Edit Stock
            </Typography>

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="id"
              disabled
              type="text"
              label="ProductID"
            />
            <br />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            />
            <br />
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="price"
              type="number"
              label="Price"
            />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="stock"
              type="number"
              label="Stock"
            />

            <div>{showPreviewImage(values)}</div>

            <div className={classes.field}>
              <img
                src="/static/img/ic_photo.png"
                style={{ width: 25, height: 20 }}
              />
              <span
                style={{ color: "#00B0CD", marginLeft: 10, marginRight: 10 }}
              >
                Add Picture
              </span>
              <input
                type="file"
                onChange={(e) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                name="image"
                click-type="type1"
                className="picupload"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!(isValid && dirty)}
            >
              Edit
            </Button>
            <Button onClick={() => Router.back()}>Cancel</Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  return (
    <Layout>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "Enter name";
          if (values.stock <= 0) errors.stock = "Enter stock";
          if (!values.price) errors.price = "Enter price";
          return errors;
        }}
        enableReinitialize
        initialValues={{ id, name, price, stock }}
        onSubmit={(values: any, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("name", values.name);
          formData.append("price", values.price);
          formData.append("stock", values.stock);
          formData.append("image", values.file);
          //   alert(JSON.stringify(values));

          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
          }, 3000);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </Layout>
  );
};

export default StockEdit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
      name: "",
      price: 100,
      stock: 10,
    },
  };
};
