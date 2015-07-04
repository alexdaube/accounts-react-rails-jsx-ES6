'use strict';

class Record extends BaseComponent {
    constructor(props){
        super(props);
        this._bind('handleDelete', 'handleToggle', 'recordRow', 'recordForm', 'handleEdit');
        this.state = {
            edit: false
        };
    }

    handleDelete(event) {
        var id = "records/" + this.props.record.id;
        event.preventDefault();
        $.ajax({
            method: 'DELETE',
            url: id,
            dataType: 'JSON',
            success: ( () => {
                this.props.handleDeleteRecord(this.props.record);
            })
        });
    }

    handleEdit(event) {
        event.preventDefault();
        var id = "records/" + this.props.record.id;
        var data = {
            title: React.findDOMNode(this.refs.title).value,
            date: React.findDOMNode(this.refs.date).value,
            amount: React.findDOMNode(this.refs.amount).value
        };
        $.ajax({
            method: 'PUT',
            url: id,
            dataType: 'JSON',
            data: { record: data },
            success: ( (data) => {
                this.setState({ edit: false });
                this.props.handleEditRecord(this.props.record, data);
            })
        });
    }

    handleToggle(event) {
        event.preventDefault();
        this.setState({ edit: !this.state.edit });
    }

    recordRow() {
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{amountFormat(this.props.record.amount)}</td>
                <td>
                    <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
                    <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
                </td>
            </tr>
        );
    }

    recordForm() {
        return (
            <tr>
                <td>
                    <input className="form-control" type="text" defaultValue={this.props.record.date} ref="date"/>
                </td>
                <td>
                    <input className="form-control" type="text" defaultValue={this.props.record.title} ref="title"/>
                </td>
                <td>
                    <input className="form-control" type="number" defaultValue={this.props.record.amount} ref="amount"/>
                </td>
                <td>
                    <a className="btn btn-default" onClick={this.handleEdit}>Update</a>
                    <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
                </td>
            </tr>
        );
    }

    render() {
        return this.state.edit ? this.recordForm() : this.recordRow();
    }
}

Record.propTypes = {
    record: React.PropTypes.object.isRequired,
    handleDeleteRecord: React.PropTypes.func.isRequired,
    handleEditRecord: React.PropTypes.func.isRequired
};
