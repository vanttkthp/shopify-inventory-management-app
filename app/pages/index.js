/*
 * Demo Shopify Product search and selection page.
 * Features:
 * - Sorting by title, inventory, type, vendor
 * - Text-based filtering
 * - Multiple selection
 * - Row rendering is customized to display product descriptions on a second line
 * - Uses the GraphQL API to retrieve product data
 * Author: Gustavo Tondello (https://github.com/gtondello)
 */
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  Layout,
  Page,
  TextStyle,
  Button,
  SkeletonBodyText,
} from "@shopify/polaris";
import ProductsTable from "../components/ProductsTable";
import ProductsSelectionReview from "../components/ProductsSelectionReview";
import { Context, Loading } from "@shopify/app-bridge-react";
import { withApollo } from "../lib/apollo";

const GET_ALL_COLLECTIONS = gql`
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

class ProductsPage extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
      productTableState: null,
      actions: null,
      confirmationTableState: null,
    };
  }
  render() {
    return (
      <Page title="Product Search" fullWidth={true}>
        <Query query={GET_ALL_COLLECTIONS}>
          {({ data, loading, error }) => {
            if (loading) return this.loadingLayout();
            if (error) {
              console.log(error);
              return <div>{error.message}</div>;
            }
            this.collections = data.collections.edges.map((edge) => edge.node);
            return (
              <Layout>
                <Layout.Section>
                  <ProductsTable
                    state={this.state.productTableState}
                    onProductsSelected={this.handleProductsSelected}
                  />
                </Layout.Section>
              </Layout>
            );
          }}
        </Query>
      </Page>
    );
  }
  loadingLayout() {
    return (
      <Layout>
        <Loading />
        <Layout.Section>
          <SkeletonBodyText lines={1} />
        </Layout.Section>
        <Layout.Section>
          <SkeletonBodyText lines={2} />
        </Layout.Section>
        <Layout.Section>
          <SkeletonBodyText lines={2} />
        </Layout.Section>
        <Layout.Section>
          <SkeletonBodyText lines={2} />
        </Layout.Section>
      </Layout>
    );
  }
  handleProductsSelected = (selectedProducts, productTableState) => {
    this.setState({
      step: 2,
      selectedProducts: selectedProducts,
      productTableState: productTableState,
    });
    window.scrollTo(0, 0);
  };
}

export default withApollo({ ssr: true })(ProductsPage);
