using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Result 的摘要说明
/// </summary>
public class Result
{
    public int Code { get; set; }

    public bool IsTrue;
    public string Message { get; set; }

}


public class Result<T> : Result
{
    public T Date { set; get; }
}
