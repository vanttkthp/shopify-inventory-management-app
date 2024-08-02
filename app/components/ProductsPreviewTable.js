/*
 * Demo Products dispay table.
 * Features:
 * - Sorting by title, type, vendor
 * - Row rendering is customized to display product descriptions on a second line
 */
import { Fragment } from 'react';
import {
    DataTable,
    Thumbnail,
    Button,
    TextStyle,
    SettingToggle
} from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';

/**
 * Props:
 * This function customizes the default product rendering to optionally display
 * a second row with each product's description.
 * - All those from DataTable
 * - showDescriptions: boolean
 * - descriptions: array
 */
function DataTableWithProductDescription(props) {
    const DataTableInner = DataTable(props).type;
    const table = new DataTableInner(props);
    const parentDefaultRenderRow = table.defaultRenderRow;
    table.defaultRenderRow = (row, index) => {
        const defaultRow = parentDefaultRenderRow(row, index);
        const descriptionRow = (table.props.showDescriptions &&
            <tr key={`row-${index}-desc`} className="Polaris-DataTable__TableRow">
                <td key={`row-${index}-desc-col-1`} className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignMiddle"></td>
                <td key={`row-${index}-desc-col-2`} className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignMiddle" colSpan={row.length-1}>
                    <div dangerouslySetInnerHTML={{__html: table.props.descriptions[index]}} />
                </td>
            </tr>
        );
        return (<Fragment key={`frag-${index}-desc`}>{defaultRow}{descriptionRow}</Fragment>);
    };
    return table;
}

/**
 * Props:
 * The main Product display table.
 * It displays only the products selected on the ProductsTable (see index.js).
 * - products: array
 * - sortDirection: string
 * - sortColumnIndex: number
 * - showDescriptions: boolean
 * - onSort: function(number, string)
 * - onToggleDescriptions: function(boolean)
 */
class ProductsPreviewTable extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            sortedProducts: this.sort(props.sortColumnIndex, props.sortDirection)
        }
    }

    /*** RENDER METHOD ***/
    render() {
        const app = this.context;
        const redirectToProduct = (gid) => {
            const redirect = Redirect.create(app);
            const id = gid.substring(gid.lastIndexOf("/")+1);
            redirect.dispatch(
                Redirect.Action.ADMIN_SECTION,
                {
                    name: Redirect.ResourceType.Product,
                    resource: {
                        id: id
                    }
                }
            );
        };
        const rows = this.state.sortedProducts.map(product => [
            <Thumbnail
                source={
                    product.images.edges[0]
                        ? product.images.edges[0].node.originalSrc
                        : ''
                }
                alt={
                    product.images.edges[0]
                        ? product.images.edges[0].node.altText
                        : ''
                }
                size="small"
            />,
            <Button plain onClick={() => redirectToProduct(product.id)}><TextStyle variation="strong">{product.title}</TextStyle></Button>,
            product.productType,
            product.vendor,
            product.tags.join(', ')
        ]);
        const descriptions = this.state.sortedProducts.map(product => product.descriptionHtml);
        return (
            <Fragment>
                <SettingToggle
                    action={{
                        content: this.props.showDescriptions ? 'Hide Descriptions' : 'Show Descriptions',
                        onAction: this.toggleShowDescriptions,
                    }}
                    enabled={this.props.showDescriptions}
                >
                    Showing {this.state.sortedProducts.length} {this.state.sortedProducts.length > 1 ? 'products' : 'product'}.<br/>
                    Product descriptions are {this.props.showDescriptions ? 'being displayed below each product row' : 'hidden'}.
                </SettingToggle>
                <div className="data-table-review">
                <DataTableWithProductDescription
                    columnContentTypes={[
                        'text',
                        'text',
                        'text',
                        'text',
                        'text'
                    ]}
                    headings={[
                        '',
                        'Product',
                        'Type',
                        'Vendor',
                        'Tags'
                    ]}
                    rows={rows}
                    descriptions={descriptions}
                    verticalAlign="middle"
                    sortable={[false, true, true, true, false]}
                    defaultSortDirection={this.props.sortDirection}
                    initialSortColumnIndex={this.props.sortColumnIndex}
                    showDescriptions={this.props.showDescriptions}
                    onSort={this.handleSort}
                />
                </div>
            </Fragment>
        );
    }

    /*** EVENT HANDLERS ***/
    toggleShowDescriptions = () => {
        if (this.props.onToggleDescriptions) {
            this.props.onToggleDescriptions(!this.props.showDescriptions);
        }
    };
    handleSort = (index, direction) => {
        this.setState({
            sortedProducts: this.sort(index, direction)
        });
        if (this.props.onSort) {
            this.props.onSort(index, direction);
        }
    };

    sort(index, direction) {
        const reverse = (direction == "descending");
        let sortedProducts = [...this.props.products];
        switch (index) {
            case 2:
                sortedProducts.sort((a, b) => {
                    const order = a.productType < b.productType ? -1 : 1;
                    return reverse ? -order : order;
                });
                break;
            case 3:
                sortedProducts.sort((a, b) => {
                    const order = a.vendor < b.vendor ? -1 : 1;
                    return reverse ? -order : order;
                });
                break;
            default:
                sortedProducts.sort((a, b) => {
                    const order = a.title < b.title ? -1 : 1;
                    return reverse ? -order : order;
                });
        }
        return sortedProducts;
    }
}

export default ProductsPreviewTable;