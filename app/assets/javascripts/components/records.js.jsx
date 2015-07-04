/**
 * Created by alexdaube on 15-07-02.
 */

'use strict';

class Records extends BaseComponent {
    constructor(props) {
        super();
        this._bind('addRecord', 'credits', 'debits', 'balance', 'deleteRecord', 'handleEditRecord');
        this.state = {
            records: props.data
        };
    }

    addRecord(record) {

        var records = React.addons.update(this.state.records, {$push: [record]});
        this.setState({ records: records });
    }

    deleteRecord(record) {
        var index = this.state.records.indexOf(record);
        var records = React.addons.update(this.state.records, {$splice: [[index, 1]]});
        this.setState({ records: records });
    }

    handleEditRecord(record, data) {
        var index = this.state.records.indexOf(record);
        var records = React.addons.update(this.state.records, {$splice: [[index, 1, data]]});
        this.setState({ records: records} );
    }

    credits() {
        return this.state.records
            .filter( (record) =>{
                return record.amount >= 0;
            })
            .reduce( (previous, current) => {
                return previous + parseFloat(current.amount);
            }, 0);
    }

    debits() {
        return this.state.records
            .filter( (record) => {
                return record.amount < 0;
            })
            .reduce( (previous, current) => {
                return previous + parseFloat(current.amount);
            }, 0);
    }

    balance() {
        return this.debits() + this.credits();
    }

    render() {
        var records = this.state.records.map((record, index) => {
            return <Record key={record.id} record={record}
                           handleDeleteRecord={this.deleteRecord} handleEditRecord={this.handleEditRecord} />
        });
        return (
            <div className="records">
                <h2 className="title"> Records </h2>
                <div className="row">
                    <AmountBox type="success" amount={this.credits()} text="Credit"/>
                    <AmountBox type="danger" amount={this.debits()} text="Debit"/>
                    <AmountBox type="info" amount={this.balance()} text="Balance"/>
                </div>
                <RecordForm handleNewRecord={this.addRecord} />
                <hr />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th> Date </th>
                            <th> Title </th>
                            <th> Amount </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                    {records}
                    </tbody>
                </table>
            </div>
        );
    }
}

Records.defaultProps = {
    records: []
};