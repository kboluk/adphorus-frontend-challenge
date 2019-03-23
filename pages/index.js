import React from 'react'

class Main extends React.PureComponent {
  static async getInitialProps () {
    return { data: 'hahaa' }
  }

  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  render () {
    const { data } = this.state
    return <div>{data}</div>
  }
}

export default Main
