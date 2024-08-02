/*
 * Component that displays a product selection review card and table.
 */
import {
    Card,
    TextStyle
} from '@shopify/polaris';
import ProductsPreviewTable from './ProductsPreviewTable'

/**
 * Props:
 * - products: array
 * - confirmationTableState: Object
 * - onContinue: function(Object)
 * - onBack: function()
 */
class ProductsSelectionReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.confirmationTableState != null ? props.confirmationTableState : {
            sortDirection: "ascending",
            sortColumnIndex: 1,
            showDescriptions: true
        }
    }

    /*** RENDER METHOD ***/
    render() {
        return (
            <Card
                secondaryFooterActions={[{ content: '< Back', onAction: this.handleBack }]}
            >
                <Card.Section>
                    <p><TextStyle variation="strong">These are the selected Products.</TextStyle></p>
                </Card.Section>
                <Card.Section>
                    <ProductsPreviewTable
                        products={this.props.products}
                        sortDirection={this.state.sortDirection}
                        sortColumnIndex={this.state.sortColumnIndex}
                        showDescriptions={this.state.showDescriptions}
                        onSort={this.handleSort}
                        onToggleDescriptions={this.handleToggleDescriptions}
                    />
                </Card.Section>
            </Card>
        );
    }

    handleSort = (index, direction) => {
        this.setState({
            sortColumnIndex: index,
            sortDirection: direction
        });
    };
    handleToggleDescriptions = (showDescriptions) => {
        this.setState({ showDescriptions: showDescriptions });
    };
    handleContinue = () => {
        if (this.props.onContinue) {
            this.props.onContinue(this.state);
        }
    };
    handleBack = () => {
        if (this.props.onBack) {
            this.props.onBack();
        }
    };
}

export default ProductsSelectionReview;