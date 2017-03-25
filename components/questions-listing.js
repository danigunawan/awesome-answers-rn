import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';

export default class QuestionsListing extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.showDetailsView = this.showDetailsView.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { questionsDs: ds.cloneWithRows([]) };
  }

  componentDidMount() {

    // TODO: Research JWT tokens for authentication
    // TODO: (only if you end up with large & complex app) checkout REDUX
    //        in order to better manage the state in your applictaion
    fetch('http://192.168.1.183:3000/api/v1/questions?api_key=0be906921ba7db5a8161ec5952c8764a')
    .then((response) => response.json())
    .then((json) => {
      this.setState({ questionsDs: this.state.questionsDs.cloneWithRows(json.questions) });
    });
  }

  static route = {
    navigationBar: {
      title: 'All Questions'
    }
  }

  genSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return <View style={styles.separator} key={rowID}></View>
  }

  renderRow(rowData) {
    return <TouchableHighlight onPress={() => this.showDetailsView(rowData.id) }>
            <Text>
              {rowData.title}
            </Text>
          </TouchableHighlight>;
  }

  showDetailsView(questionId) {
    console.log('>>>>> CLICK');
    this.props.navigator.push('question', { questionId: questionId });
  }

  render() {
    return <View>
             <Text>All Questions</Text>
               <ListView
                 dataSource={this.state.questionsDs}
                 enableEmptySections={true}
                 renderSeparator={this.genSeparator}
                 renderRow={this.renderRow}
               />
           </View>;
  }
}


const styles = StyleSheet.create({
  separator: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    marginTop: 5,
    marginBottom: 5

  },
});
