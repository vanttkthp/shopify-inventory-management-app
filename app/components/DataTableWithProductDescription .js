import React from 'react';
import { DataTable } from '@shopify/polaris';

class DataTableWithProductDescription extends React.Component {
    render() {
        const { columnContentTypes, headings, rows, descriptions, verticalAlign, sortable, defaultSortDirection, initialSortColumnIndex, showDescriptions, onSort } = this.props;
        
        return (
            <div>
                <DataTable
                    columnContentTypes={columnContentTypes}
                    headings={headings}
                    rows={rows}
                    verticalAlign={verticalAlign}
                    sortable={sortable}
                    defaultSortDirection={defaultSortDirection}
                    initialSortColumnIndex={initialSortColumnIndex}
                    onSort={onSort}
                />
                {showDescriptions && descriptions.map((description, index) => (
                    <div key={index} dangerouslySetInnerHTML={{ __html: description }} />
                ))}
            </div>
        );
    }
}

export default DataTableWithProductDescription;
