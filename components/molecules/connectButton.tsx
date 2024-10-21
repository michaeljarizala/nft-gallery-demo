import React, { useEffect, useContext } from "react"
import Button from "@/components/atoms/button"
import { connectWallet, initAccount, walletChange } from "@/utils/web3"
import { ModalContext } from "@/utils/contexts/modalContext"
import { AccountContext } from "@/utils/contexts/accountContext"
import { NavDrawerContext } from "@/utils/contexts/navDrawerContext"
import HamburgerIcon from "@/components/atoms/icons/bar"

interface Props {
    showAccount?: boolean
}

const ConnectButton: React.FC<Props> = (props: Props):
React.JSX.Element => {
  const { showAccount = true } = props

  const modalContext = useContext(ModalContext)
  const accountContext = useContext(AccountContext)
  const navDrawerContext = useContext(NavDrawerContext)

  const handleConnect = async () => {
    const wallet = await connectWallet()

    if (wallet.data.account) {
      accountContext.dispatch({
        type: "SET_ACCOUNT",
        payload: {
          account: wallet.data.account,
          chain: wallet.data.networkSlug,
        },
      })
    }

    modalContext.dispatch({
      type: "OPEN",
      payload: {
        open: !modalContext.state.open,
        children: (
          <div className="flex flex-col">
            <div className="break-words">
              {wallet.message}
            </div>
            <div className="flex justify-end gap-20 mt-5">
              <Button
                className="rounded-md"
                label="Ok"
                onClick={() => modalContext.dispatch({
                  type: "OPEN",
                  payload: { open: !!modalContext.state.open }
                })}
              />
            </div>
          </div>
        )
      }
    })
  }

  const handleDisconnect = () => {
    accountContext.dispatch({
      type: "UNSET_ACCOUNT",
    })
  }

  const toggleNavDrawer = () => {
    navDrawerContext.dispatch({
      type: "OPEN",
      payload: { open: !navDrawerContext.state.open }
    })
  }

  const handleAccountInitialization = async () => {
    const wallet = await initAccount()

    if (wallet) {
      if (wallet.data.account) {
        accountContext.dispatch({
          type: "SET_ACCOUNT",
          payload: {
            account: wallet.data.account,
            chain: wallet.data.networkSlug,
          },
        })
      }
    } else {
      accountContext.dispatch({
        type: "RETRIEVE_CACHED_ACCOUNT",
        payload: {
          account: `${localStorage.getItem("account")}`,
          chain: `${localStorage.getItem("chain")}`,
        },
      })
    }
  }

  const handleNavDrawer = () => {
    navDrawerContext.dispatch({
      type: "OPEN",
      payload: {
        open: !navDrawerContext.state.open,
        children: (
          <div className="
            flex flex-col gap-10
            items-center"
          >
            {accountContext.state.account ? (
              <div className="text-center">
                <div className="text-sm break-words">
                  {accountContext.state.account}
                </div>
                <div className="text-sm font-bold">Account</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm break-words">
                  No account connected at the moment.
                </div>
              </div>
            )}
            <Button
              className="rounded-md"
              label={accountContext.state.account
                ? 'Logout'
                : 'Connect Wallet'
              }
              onClick={() => {
                if (!accountContext.state.account) {
                  handleConnect()
                  toggleNavDrawer()
                } else {
                  handleDisconnect()
                  toggleNavDrawer()
                }
              }}
            />
          </div>
        )
      }
    })
  }

  // useEffect calls
  // ===============
  useEffect(() => { // initialize account, if connected
    handleAccountInitialization()
  }, [])

  useEffect(() => { // listen on metamask account changes
    window.ethereum?.on("accountsChanged", async () => {
      const wallet = await walletChange(accountContext.state.account)

      if (wallet) {
        if (wallet.data.account) {
          accountContext.dispatch({
            type: "SET_ACCOUNT",
            payload: {
              account: wallet.data.account,
              chain: wallet.data.networkSlug,
            },
          })
        }
      }
    })
  })

  return (
    <>
      <div className="md:hidden" onClick={handleNavDrawer}>
        <HamburgerIcon />
      </div>
      <div className="hidden md:flex md:items-center gap-3">
        {showAccount && accountContext.state.account ? (
          <div>
            <div className="
              flex items-center justify-center
              cursor-pointer
            "
            >
              {accountContext.state.account.substring(0, 10)}...
            </div>
          </div>
        ) : null}
        <Button
          className="w-full rounded-md"
          label={accountContext.state.account
            ? 'Logout'
            : 'Connect Wallet'
          }
          onClick={() => {
            if (!accountContext.state.account) {
              handleConnect()
            } else {
              handleDisconnect()
            }
          }}
        />
      </div>
    </>
  )
}

export default ConnectButton