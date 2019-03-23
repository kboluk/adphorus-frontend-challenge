import React from 'react'
import fetchPonyfill from 'fetch-ponyfill'
import dotProp from 'dot-prop-immutable'
import NestedList from '../components/NestedList'

const { fetch } = fetchPonyfill()

function getNestedChildren (listings, parentId) {
  const tieredList = []
  for (let i = 0; i < listings.length; i++) {
    if (listings[i].parentId === parentId) {
      const children = getNestedChildren(listings, listings[i].id)
      if (children.length) {
        listings[i].children = children
      }
      tieredList.push(listings[i])
    }
  }
  return tieredList
}

class Main extends React.PureComponent {
  static async getInitialProps () {
    let data = null
    try {
      data = await fetch('https://gist.githubusercontent.com/burakcan/ca77e8fc11a1455cc1962ad7318b8fbc/raw/2e6d7ce9978e10b5e9f4115dc7f0aeec158cd6aa/dataset.json')
        .then(response => response.json())
        .catch(console.log)
    } catch (e) {
      console.log(e)
    }
    return { data }
  }

  constructor (props) {
    super(props)
    const { data } = props
    const items = data
      .map((item) => ({
        phone: item.Phone,
        city: item.City,
        name: item.Name,
        id: item.ID,
        parentId: item.parentID || 0,
        deleted: false,
        expanded: false
      }))
    this.state = { tree: getNestedChildren(items, 0) }
    this.toggleKeyInPath = this.toggleKeyInPath.bind(this)
  }

  toggleKeyInPath (key, path) {
    this.setState((state) => {
      return dotProp.toggle(state, `tree.${path.join('.children.')}.${key}`)
    })
  }

  render () {
    const { tree } = this.state
    return (
      <ul>
        {
          tree.map((item, idx) => (
            <NestedList
              listing={item}
              path={[idx]}
              toggle={this.toggleKeyInPath}
              key={item.id}
            />))
        }
        <style jsx global>{`
          ul {
            padding: 0;
            margin: 0;
          }
        `}</style>
      </ul>
    )
  }
}

export default Main
